import { env, stdout } from 'process';

const parseEnv = () => {
  const rssVariables = Object.keys(env).filter(key => key.startsWith('RSS_'));
  
  if (rssVariables.length === 0) {
    return console.log('There is no variable with prefix "RSS_"');
  }
  
  rssVariables.forEach((variable, index) => {
    stdout.write(`${variable}=${env[variable]}`);
    stdout.write((index + 1 !== rssVariables.length) ? '; ' : '\n');
  });
};

parseEnv();