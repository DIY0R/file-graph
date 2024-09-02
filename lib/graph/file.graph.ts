import {
  FileGraphAbstract,
  IFindVertex,
  IPredicate,
  IUpdater,
  IUuidArray,
  IVertex,
  IVertexTree,
  uuidType,
} from '../interfaces';
import { StorageFile } from './storage.file';
import { AsyncTaskQueue, uuid } from '../utils';

class FileGraphIml implements FileGraphAbstract {
  constructor(
    private readonly storageFile: StorageFile,
    private readonly asyncTaskQueue: AsyncTaskQueue,
  ) {}

  public async createVertex<T extends object>(data: T): Promise<IVertex<T>> {
    const vertex = this.vertexTemplate(data);
    await this.storageFile.appendFile(vertex);
    return vertex;
  }

  public async createVertices<T extends object>(
    data: T[],
  ): Promise<IVertex<T>[]> {
    const vertices = data.map(this.vertexTemplate);
    await this.storageFile.appendFile(vertices);
    return vertices;
  }

  public updateVertex<T extends object>(
    updater: IUpdater<T>,
  ): Promise<boolean> {
    return this.asyncTaskQueue.addTask(() =>
      this.storageFile.updateLine(updater),
    );
  }

  public deleteVertex<T extends object>(
    predicate: IPredicate<T>,
  ): Promise<boolean> {
    return this.asyncTaskQueue.addTask(() =>
      this.storageFile.updateLine(predicate),
    );
  }

  public async findOne<T extends object>(
    predicate: IPredicate<T>,
  ): Promise<IVertex<T> | null> {
    return this.storageFile.searchLine(predicate);
  }

  public async findAll<T extends object>(
    predicate: IPredicate<T>,
  ): Promise<IVertex<T>[]> {
    const vertices = [];
    const findVertex: IFindVertex<T> = vertex => {
      if (predicate(vertex)) vertices.push(vertex);
    };
    await this.storageFile.searchLine(findVertex);
    return vertices;
  }

  public async createEdge(ids: IUuidArray): Promise<boolean> {
    const updater = (vertex: IVertex<object>) => {
      const index = ids.indexOf(vertex.id);
      if (index === -1) return;
      const neighbors = [ids[index - 1], ids[index + 1]].filter(
        neighbor => neighbor !== undefined,
      );
      const links = vertex.links;
      neighbors.forEach(neighbor => {
        if (!links.includes(neighbor)) links.push(neighbor);
      });
      return { links };
    };
    const updateResult = await this.storageFile.updateLine(updater);
    return updateResult;
  }

  public async createArcs(ids: IUuidArray): Promise<boolean> {
    const updater = (vertex: IVertex<object>) => {
      const index = ids.indexOf(vertex.id);
      if (index === -1) return;

      const nextVertexId = ids[index + 1];

      if (nextVertexId && !vertex.links.includes(nextVertexId)) {
        return { links: [...vertex.links, nextVertexId] };
      }
    };

    const updateResult = await this.storageFile.updateLine(updater);
    return updateResult;
  }

  public createArc(
    sourceVertexId: uuidType,
    targetVertexId: uuidType,
  ): Promise<boolean> {
    return this.updateArc(targetVertexId, vertex => {
      if (vertex.id !== sourceVertexId) return;
      if (!vertex.links.includes(targetVertexId))
        return { links: [...vertex.links, targetVertexId] };

      throw new Error(
        `targetVertexId: ${targetVertexId} already exists in vertex ${sourceVertexId}`,
      );
    });
  }

  public removeArc(
    sourceVertexId: uuidType,
    targetVertexId: uuidType,
  ): Promise<boolean> {
    return this.updateArc(targetVertexId, vertex => {
      if (vertex.id !== sourceVertexId) return;
      if (vertex.links.includes(targetVertexId))
        return { links: vertex.links.filter(v => v !== targetVertexId) };

      throw new Error(
        `targetVertexId: ${targetVertexId} don't exists in vertex ${sourceVertexId}`,
      );
    });
  }

  public async hasArc(
    sourceVertexId: uuidType,
    targetVertexId: uuidType,
  ): Promise<boolean> {
    const targetVertexExists = await this.findOne(
      vertex => vertex.id === sourceVertexId,
    );
    if (!targetVertexExists)
      throw new Error(`Target vertex with ID "${targetVertexId}" not found`);

    return targetVertexExists.links.includes(targetVertexId);
  }

  public async findUpToLevel<T extends object>(
    vertexId: uuidType,
    maxLevel: number,
  ): Promise<IVertexTree<T>[]> {
    if (maxLevel < 0) throw new Error('Level must be a non-negative integer.');
    const startingVertex = await this.findOne<T>(
      vertex => vertex.id === vertexId,
    );

    if (!startingVertex)
      throw new Error(`Vertex with id ${vertexId} not found.`);

    const resultVertices: IVertexTree<T>[] = [];
    const queue = [{ vertex: startingVertex, currentLevel: 0 }];

    while (queue.length > 0) {
      const { vertex, currentLevel } = queue.shift()!;
      const vertexLinks = vertex.links;
      const nextLevel = currentLevel + 1;

      if (currentLevel > maxLevel) break;
      resultVertices.push({ ...vertex, level: currentLevel });

      if (!vertexLinks.length) continue;
      await this.storageFile.searchLine<T>(currentVertex => {
        const isNewArc =
          vertexLinks.includes(currentVertex.id) &&
          !resultVertices.some(
            addedVertex => addedVertex.id === currentVertex.id,
          );
        if (isNewArc)
          queue.push({ vertex: currentVertex, currentLevel: nextLevel });
      });
    }

    return resultVertices;
  }

  private updateArc(
    targetVertexId: uuidType,
    updater: IPredicate<object> | IUpdater<object>,
  ): Promise<boolean> {
    return this.asyncTaskQueue.addTask<boolean>(async () => {
      const targetVertexExists = await this.findOne(
        vertex => vertex.id === targetVertexId,
      );
      if (!targetVertexExists)
        throw new Error(`Target vertex with ID "${targetVertexId}" not found`);

      const updateResult = await this.storageFile.updateLine(updater);
      return updateResult;
    });
  }

  private vertexTemplate<T extends object>(data: T): IVertex<T> {
    return { id: uuid(), data, links: [] };
  }
}

export const FileGraph = (path: `${string}.txt`) =>
  new FileGraphIml(new StorageFile(path), new AsyncTaskQueue());
