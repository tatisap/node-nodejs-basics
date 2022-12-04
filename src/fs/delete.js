import path from 'path';
import { fileURLToPath } from 'url';
import { unlink } from 'fs/promises';

const remove = async () => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const removePath = path.join(dirname, 'files', 'fileToRemove.txt');
  try {
    await unlink(removePath);
  }
  catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
  }
};

await remove();
