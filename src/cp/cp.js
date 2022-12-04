import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const spawnChildProcess = async (args) => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const scriptPath = path.join(dirname, 'files', 'script.js');
  const node = spawn('node', [scriptPath, ...args], { stdio: [0, 1, 2, 'ipc'] });
  node.on('error', (err) => console.error(err.message));
};
// Put your arguments in function call to test this functionality
spawnChildProcess([1, 2, 3]);
