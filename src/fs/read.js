import path from 'path';
import { fileURLToPath } from 'url';
import { readFile } from 'fs/promises';

const read = async () => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const filePath = path.join(dirname, 'files', 'fileToRead.txt');
  try {
    const content = await readFile(filePath, { encoding: 'utf-8' });
    console.log(content);
  }
  catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
  }
};

await read();
