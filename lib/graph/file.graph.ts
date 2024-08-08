import { FileGraphAbstract, IVertex, uuidType } from '../interfaces';
import { StorageFile } from './storage.file';
import { uuid } from '../utils';

class FileGraphIml implements FileGraphAbstract {
  constructor(private readonly storageFile: StorageFile) {}
  public async createVertex<T extends object>(vertex: T): Promise<uuidType> {
    const id = uuid();
    await this.storageFile.appendFile({ id, ...vertex });
    return id;
  }
  public async findOne<T extends object>(
    predicate: (vertex: T & IVertex) => boolean,
  ): Promise<(T & IVertex) | null> {
    return this.storageFile.searchLine(predicate);
  }
  public updateVertex<T extends object>(
    updater: (vertex: T & IVertex) => (T & IVertex) | object,
  ): Promise<boolean> {
    return this.storageFile.updateLine(updater);
  }
}

export const FileGraph = (path: `${string}.txt`) =>
  new FileGraphIml(new StorageFile(path));
