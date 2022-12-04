import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { fileURLToPath } from 'url';
import { createGzip } from 'zlib';

const compress = async () => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const source = createReadStream(path.join(dirname, 'files', 'fileToCompress.txt'));
  const dest = createWriteStream(path.join(dirname, 'files', 'archive.gz'));
  const gzip = createGzip();

  pipeline(
    source,
    gzip,
    dest,
    (err) => {
      if (err) console.error(err.message)
    }
  );
};

await compress();