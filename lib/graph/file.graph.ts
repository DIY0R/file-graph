import { UUID } from 'crypto';
import { FileGraphAbstract, IVertex } from '../interfaces';
import { StorageFile } from './storage.file';
import { uuid } from '../utils';

class FileGraphIml<T extends IVertex> implements FileGraphAbstract {
  constructor(private readonly storageFile: StorageFile) {}
  public async createVertex<T extends object>(model: T): Promise<UUID> {
    const id = uuid();
    await this.storageFile.appendFile({ id, ...model });
    return id;
  }
  public async findOne<T extends object>(
    predicate: (model: T & IVertex) => boolean,
  ): Promise<(T & IVertex) | null> {
    return this.storageFile.searchLine(predicate);
  }
}

export const FileGraph = (path: `${string}.txt`) =>
  new FileGraphIml(new StorageFile(path));
