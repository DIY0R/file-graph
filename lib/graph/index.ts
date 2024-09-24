import { asyncTaskQueue } from '../utils';
import FileGraphIml from './file.graph';
import StorageFile from './storage.file';

export const FileGraph = (path: string) =>
  new FileGraphIml(new StorageFile(path), asyncTaskQueue);
