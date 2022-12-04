import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { fileURLToPath } from 'url';
import { createUnzip } from 'zlib';

const decompress = async () => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const source = createReadStream(path.join(dirname, 'files', 'archive.gz'));
  const dest = createWriteStream(path.join(dirname, 'files', 'fileToCompress.txt'));
  const unzip = createUnzip();

  pipeline(
    source,
    unzip,
    dest,
    (err) => {
      if (err) return console.error(err)
    }
  );
};

await decompress();