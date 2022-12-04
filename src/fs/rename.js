import path from 'path';
import { fileURLToPath } from 'url';
import { rename as renameFile, access } from 'fs/promises';

const isExist = async (filePath) => {
  try {
    await access(filePath);
    return true;
  } 
  catch (err) {
    if (err.code === 'ENOENT') return false;
  }
}

const rename = async () => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const oldPath = path.join(dirname, 'files', 'wrongFilename.txt');
  const newPath = path.join(dirname, 'files', 'properFilename.md');

  if (await isExist(newPath)) {
    throw new Error('FS operation failed');
  }

  try {
    await renameFile(oldPath, newPath);
  }
  catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
  }
};

await rename();
