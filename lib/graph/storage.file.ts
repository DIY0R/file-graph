import { createReadStream } from 'fs';
import { appendFile } from 'fs/promises';
import readline from 'readline';

export class StorageFile {
  constructor(private readonly path: string) {}
  public async appendFile<T extends Record<string, any>>(model: T): Promise<T> {
    const modelSer = this.serializer(model);
    await appendFile(this.path, modelSer + '\n');
    return model;
  }
  public async searchLine<T extends object>(predicate: (model: T) => boolean) {
    const fileStream = createReadStream(this.path, 'utf8');
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    for await (const line of rl)
      if (line.trim()) {
        const model = this.deserializer(line) as T;
        if (predicate(model)) return model;
      }

    return null;
  }
  private serializer(model: Record<string, any>) {
    return JSON.stringify(model);
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
