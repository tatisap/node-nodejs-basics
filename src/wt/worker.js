import { fileURLToPath } from 'url';
import { Worker, isMainThread, parentPort } from 'worker_threads';

const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  const filename = fileURLToPath(import.meta.url);
  if (isMainThread) {
    const worker = new Worker(filename);
    worker.once('message', (value) => {
      console.log(value);
    });
    //Send Fubonacci number position (4) to the worker
    worker.postMessage(4);
  } else {
    parentPort.once('message', (value) => {
      const result = nthFibonacci(value);
      parentPort.postMessage(result);
    });
  }
};

sendResult();