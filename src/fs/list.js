import path from 'path';
import { fileURLToPath } from 'url';
import { readdir } from 'fs/promises';

const list = async () => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const folderPath = path.join(dirname, 'files');
  try {
    const files = await readdir(folderPath, { withFileTypes: true });
    for await (const file of files) {
      if (file.isFile()) {
        console.log(file.name);
      }
    }
  }
  catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
  } 
};

await list();
