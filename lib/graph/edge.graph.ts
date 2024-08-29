import { IPredicate, IUpdater, IVertex, uuidType } from 'lib';
import { AsyncTaskQueue } from 'lib/utils';
import { StorageFile } from './storage.file';

export class Edge {
  constructor(
    private readonly storageFile: StorageFile,
    private readonly asyncTaskQueue: AsyncTaskQueue,
  ) {}

  public async createEdge(ids: uuidType[]): Promise<boolean> {
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
    const targetVertexExists = await this.storageFile.searchLine(
      vertex => vertex.id === sourceVertexId,
    );
    if (!targetVertexExists)
      throw new Error(`Target vertex with ID "${targetVertexId}" not found`);

    return targetVertexExists.links.includes(targetVertexId);
  }

  private updateArc(
    targetVertexId: uuidType,
    updater: IPredicate<object> | IUpdater<object>,
  ): Promise<boolean> {
    return this.asyncTaskQueue.addTask<boolean>(async () => {
      const targetVertexExists = await this.storageFile.searchLine(
        vertex => vertex.id === targetVertexId,
      );
      if (!targetVertexExists)
        throw new Error(`Target vertex with ID "${targetVertexId}" not found`);

      const updateResult = await this.storageFile.updateLine(updater);
      return updateResult;
    });
  }
}
