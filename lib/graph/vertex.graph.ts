import { IFindVertex, IPredicate, IUpdater, IVertex } from 'lib/interfaces';
import { AsyncTaskQueue, uuid } from 'lib/utils';
import { StorageFile } from './storage.file';

export class Vertex {
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

  private vertexTemplate<T extends object>(data: T): IVertex<T> {
    return { id: uuid(), data, links: [] };
  }
}
