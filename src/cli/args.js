import { argv, stdout } from 'process';

const parseArgs = () => {
  const args = argv.slice(2);

  if (args.length === 0) {
    return console.log('There is no argument');
  }

  args.forEach((arg, index) => {
    if (index % 2 === 0) {
      stdout.write(`${arg.slice(2)} is `);
    } else {
      stdout.write((index + 1 !== args.length) ? `${arg}, ` : `${arg}\n`);
    }
  })
};

parseArgs();