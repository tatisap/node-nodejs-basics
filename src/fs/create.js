import path from 'path';
import { fileURLToPath } from 'url';
import { writeFile } from 'fs/promises';

const create = async () => {
  try {
    const dirname = path.dirname(fileURLToPath(import.meta.url));
    const filePath = path.join(dirname, 'files', 'fresh.txt');
    await writeFile(filePath, 'I am fresh and young', {flag:'wx'});
  }
  catch (err) {
    if (err.code === 'EEXIST') {
      throw new Error('FS operation failed');
    }
  }
};

await create();