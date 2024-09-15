type AsyncTask = () => Promise<any>;
export class AsyncTaskQueue {
  private queue: AsyncTask[] = [];
  private isProcessing = false;

  addTask<T>(task: AsyncTask): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(() => task().then(resolve, reject));
      this.processQueue();
    });
  }

  private async processQueue(): Promise<void> {
    if (this.isProcessing) return;
    this.isProcessing = true;
    try {
      while (this.queue.length > 0) {
        const task = this.queue.shift();
        if (task) await task();
      }
    } finally {
      this.isProcessing = false;
    }
  }
}

export const asyncTaskQueue = new AsyncTaskQueue();
