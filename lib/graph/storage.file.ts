import {
  createReadStream,
  createWriteStream,
  promises as fsPromises,
} from 'fs';
import { appendFile } from 'fs/promises';
import readline from 'readline';

export class StorageFile {
  constructor(private readonly path: string) {}
  public async appendFile<T extends Record<string, any>>(
    vertex: T,
  ): Promise<T> {
    const vertexSer = this.serializer(vertex);
    await appendFile(this.path, vertexSer + '\n');
    return vertex;
  }
  public async searchLine<T extends object>(
    predicate: (vertex: T) => boolean,
  ): Promise<any> {
    const fileStream = this.createLineStream();
    const findVertex = await fileStream(async line => {
      const vertex = this.deserializer(line) as T;
      if (predicate(vertex)) return vertex;
    });
    return findVertex ?? null;
  }
  public async updateLine<T extends object>(
    updater: (vertex: T) => object,
  ): Promise<boolean> {
    const tempPath = `${this.path}.tmp`;
    let updated = false;
    const fileStream = this.createLineStream();
    const tempStream = createWriteStream(tempPath, { encoding: 'utf8' });
    await fileStream(async line => {
      const vertex = this.deserializer(line) as T;
      const updaterVertex = updater(vertex);
      if (updaterVertex instanceof Object) {
        tempStream.write(
          this.serializer({ ...vertex, ...updaterVertex }) + '\n',
        );
        updated = true;
      } else {
        tempStream.write(line + '\n');
      }
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
          if (line.trim()) {
            const result = await fn(line);
            if (result) {
              rl.close();
              fileStream.destroy();
              return result;
            }
          }
        }
      } catch (err) {
        console.error(err);
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
