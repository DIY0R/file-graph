export class AsyncTaskQueue {
  private queue: Promise<any> = Promise.resolve();
  public addTask<T>(task: () => Promise<T>): Promise<T> {
    this.queue = this.queue.then(task).catch(err => {
      throw err;
    });
    return this.queue;
  }
}
