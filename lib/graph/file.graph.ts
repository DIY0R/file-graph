import { IFileGraph } from '../interfaces';
import { StorageFile } from './storage.file';
import { AsyncTaskQueue } from '../utils';
import { merge } from 'lib/utils/merge.class';
import { Vertex } from './vertex.graph';
import { Edge } from './edge.graph';

class FileGraph2 extends merge(Vertex, Edge) {
  constructor(storageFile: StorageFile, asyncTaskQueue: AsyncTaskQueue) {
    super(storageFile, asyncTaskQueue);
  }
}
export const FileGraph = (path: `${string}.txt`): IFileGraph =>
  new FileGraph2(new StorageFile(path), new AsyncTaskQueue()) as IFileGraph;
