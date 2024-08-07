import { UUID } from 'crypto';
import { FileGraphAbstract } from '../interfaces';
import { StorageFile } from './storage.file';
import { uuid } from '../utils';

class FileGraphIml implements FileGraphAbstract {
  constructor(private readonly storageFile: StorageFile) {}
  public async createVertex<T extends object>(model: T): Promise<UUID> {
    const id = uuid();
    await this.storageFile.writeModel({ [id]: model });
    return id;
  }
  public async findById(id: string): Promise<object | null> {
    return this.storageFile.search(id);
  }
}

export const FileGraph = (path: `${string}.txt`) =>
  new FileGraphIml(new StorageFile(path));
