import { stdin, stdout } from 'process';
import { pipeline, Transform } from 'stream';

const reverse = (data) => data.split('').reverse().join('');

const transform = async () => {
  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      let data = chunk.toString();
      if (data.endsWith('\n')) {
        data = data.slice(0, data.length - 1);
      }
      callback(null, `${reverse(data)}\n`);
    }
  });

  pipeline(
    stdin,
    transformStream,
    stdout,
    (err) => {
      if (err) console.error(err.message);
    }
  );
};

await transform();