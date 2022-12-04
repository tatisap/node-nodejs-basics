import path from 'path';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';

const calculateHash = async () => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const content = await readFile(path.join(dirname, 'files', 'fileToCalculateHashFor.txt'), { encoding: 'utf-8' });
  const { createHash } = await import('node:crypto');

  const hash = createHash('sha256');
  hash.update(content);
  console.log(hash.digest('hex'));
};

await calculateHash();