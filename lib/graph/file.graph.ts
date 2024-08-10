import {
  FileGraphAbstract,
  IPredicate,
  IUpdater,
  IVertex,
  uuidType,
} from '../interfaces';
import { StorageFile } from './storage.file';
import { uuid } from '../utils';

class FileGraphIml implements FileGraphAbstract {
  constructor(private readonly storageFile: StorageFile) {}
  public async createVertex<T extends object>(vertex: T): Promise<uuidType> {
    const id = uuid();
    await this.storageFile.appendFile<T>({ id, ...vertex });
    return id;
  }
  public async findOne<T extends object>(
    predicate: IPredicate<T>,
  ): Promise<(T & IVertex) | null> {
    return this.storageFile.searchLine(predicate);
  }
  public updateVertex<T extends object>(
    updater: IUpdater<T>,
  ): Promise<boolean> {
    return this.storageFile.updateLine(updater);
  }
  public deleteVertex<T extends object>(
    predicate: IPredicate<T>,
  ): Promise<boolean> {
    return this.storageFile.updateLine(predicate);
  }
}

export const FileGraph = (path: `${string}.txt`) =>
  new FileGraphIml(new StorageFile(path));
