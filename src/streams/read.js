import path from 'path';
import { createReadStream } from 'fs';
import { stdout } from 'process';
import { fileURLToPath } from 'url';

const read = async () => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const stream = createReadStream(path.join(dirname, 'files', 'fileToRead.txt'), 'utf-8');

  let content = '';
  stream.on('data', (chunk) => content += chunk);
  stream.on('end', () => stdout.write(`${content}\n`));
  stream.on('error', (err) => console.error(err.message));
};

await read();