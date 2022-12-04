import path from 'path';
import { cpus } from 'os';
import { fileURLToPath } from 'url';
import { Worker } from 'worker_threads';

const performCalculations = async () => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(dirname, 'worker.js');
  const coresNum = cpus().length;
  const workers = [];

  for (let i = 0; i < coresNum; i++) {
    const worker = new Worker(filePath);
    worker.postMessage(10 + i);
    workers.push(worker);
  }

  Promise.allSettled(workers.map(worker => {
    return new Promise((resolve, reject) => {
      worker.on('message', (value) => resolve(value));
      worker.on('error', (err) => reject(err));
    });  
  }))
    .then((results) => {
      const output = results.map(result => {
        return {
          status: (result.status === 'fulfilled') ? 'resolved' : 'error',
          data: result.value || null,
        };
      });
      console.log(output);
    });
};

await performCalculations();