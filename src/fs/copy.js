import path from 'path';
import { fileURLToPath } from 'url';
import { opendir, mkdir, copyFile } from 'fs/promises';

const copyDir = async (src, dest) => {
  try {
    const dir = await opendir(src);
    await mkdir(dest);

    for await (const dirent of dir) {
      const srcFilePath = path.join(src, dirent.name);
      const destFilePath = path.join(dest, dirent.name);

      if (dirent.isFile()) {
        await copyFile(srcFilePath, destFilePath);
      } else {
        copyDir(srcFilePath, destFilePath);
      }
    }
  }
  catch (err) {
    if (err.code === 'EEXIST' || err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
  }
};

const copy = async () => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const srcFolderPath = path.join(dirname, 'files');
  const destFolderPath = path.join(dirname, 'files_copy');
  copyDir(srcFolderPath, destFolderPath);
};

await copy();
