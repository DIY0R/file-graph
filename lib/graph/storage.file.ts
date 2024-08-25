import {
  createReadStream,
  createWriteStream,
  promises as fsPromises,
} from 'fs';
import { appendFile } from 'fs/promises';
import { finished } from 'stream/promises';
import readline from 'readline';
import { mergeVertices, uuid } from '../utils';
import { IFindVertex, IPredicate, IUpdater, IVertex } from '../interfaces';

export class StorageFile {
  constructor(private readonly path: string) {}

  public async appendFile<T extends object>(vertex: T): Promise<void> {
    const vertexSer = Array.isArray(vertex)
      ? vertex.map(this.serializer).join('\n') + '\n'
      : this.serializer(vertex) + '\n';

    return appendFile(this.path, vertexSer);
  }

  public async searchLine<T extends object>(
    predicate: IFindVertex<T> | IPredicate<T>,
  ): Promise<IVertex<T>> {
    const fileStream = this.createLineStream(true);
    return await fileStream(async line => {
      const vertex = this.deserializer(line) as IVertex<T>;
      if (predicate(vertex)) return vertex;
    });
  }

  public async updateLine<T extends object>(
    updater: IPredicate<T> | IUpdater<T>,
  ): Promise<boolean> {
    const tempPath = `${this.path}.${uuid()}.tmp`;
    let updated = false;
    const fileStream = this.createLineStream(false);
    const tempStream = createWriteStream(tempPath, { encoding: 'utf8' });
    try {
      await fileStream(async line => {
        const vertex = this.deserializer(line) as IVertex<T>;
        const updaterVertex = updater(vertex);
        if (updaterVertex === true) return (updated = true);
        if (typeof updaterVertex === 'object' && updaterVertex !== null) {
          const newVertices = mergeVertices(vertex, updaterVertex);
          tempStream.write(this.serializer(newVertices) + '\n');
          return (updated = true);
        }
        tempStream.write(line + '\n');
      });
    } catch (error) {
      await fsPromises.unlink(tempPath);
      throw error;
    } finally {
      tempStream.end();
    }
    await finished(tempStream);
    await fsPromises.rename(tempPath, this.path);
    return updated;
  }
  private createLineStream(canAbort: boolean) {
    const fileStream = createReadStream(this.path, 'utf8');
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    return async (read: (line: string) => Promise<any>) => {
      try {
        for await (const line of rl) {
          const result = await read(line);
          if (canAbort && result) return result;
        }
      } finally {
        rl.close();
        fileStream.destroy();
      }
      return null;
    };
  }

  private serializer(vertex: Record<string, any>) {
    try {
      return JSON.stringify(vertex);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  private deserializer(data: string): Record<string, any> {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
