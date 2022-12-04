import path from 'path';
import { createWriteStream } from 'fs';
import { stdin, stdout } from 'process';
import { fileURLToPath } from 'url';

const write = async () => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const stream = createWriteStream(path.join(dirname, 'files', 'fileToWrite.txt'));
  stdout.write('Use Ctrl+C to exit after input\n');
  stdin.on('data', (data) => stream.write(data));
};

await write();