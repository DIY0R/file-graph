import {
  createReadStream,
  createWriteStream,
  promises as fsPromises,
} from 'fs';
import { appendFile } from 'fs/promises';
import readline from 'readline';
import { uuid } from '../utils';
import { IPredicate, IUpdater, IVertex } from '../interfaces';

export class StorageFile {
  constructor(private readonly path: string) {}

  public async appendFile<T extends object>(vertex: T): Promise<T> {
    const vertexSer = this.serializer(vertex);
    await appendFile(this.path, vertexSer + '\n');
    return vertex;
  }

  public async searchLine<T extends object>(
    predicate: IPredicate<T>,
  ): Promise<any> {
    const fileStream = this.createLineStream();
    const findVertex = await fileStream(async line => {
      const vertex = this.deserializer(line) as T & IVertex;
      if (predicate(vertex)) return vertex;
    });
    return findVertex ?? null;
  }

  public async updateLine<T extends object>(
    updater: IPredicate<T> | IUpdater<T>,
  ): Promise<boolean> {
    const tempPath = `${this.path}.${uuid()}.tmp`;
    let updated = false;
    const fileStream = this.createLineStream();
    const tempStream = createWriteStream(tempPath, { encoding: 'utf8' });
    await fileStream(async line => {
      const vertex = this.deserializer(line) as T & IVertex;
      const updaterVertex = updater(vertex);
      if (typeof updaterVertex === 'object' && updaterVertex !== null) {
        tempStream.write(
          this.serializer({ ...vertex, ...updaterVertex }) + '\n',
        );
        return void (updated = true);
      }
      if (updaterVertex === true) return void (updated = true);
      tempStream.write(line + '\n');
    });
    tempStream.end();
    await new Promise<void>((resolve, reject) => {
      tempStream.on('finish', () => {
        fsPromises
          .rename(tempPath, this.path)
          .then(() => resolve())
          .catch(reject);
      });
      tempStream.on('error', reject);
    });

    return updated;
  }

  private createLineStream() {
    const fileStream = createReadStream(this.path, 'utf8');
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    return async (fn: (line: string) => Promise<any>) => {
      try {
        for await (const line of rl) {
          const result = await fn(line);
          if (result) return result;
        }
      } catch (error) {
        console.error(error);
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
