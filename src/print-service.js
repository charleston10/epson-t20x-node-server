const { spawn } = require('child_process');
const config = require('../config');

function printSilently(filePath) {
  const process = spawn(config.printFileDir, [filePath], {
    detached: true,
    stdio: 'ignore',
    windowsHide: true,
  });

  process.unref();
}

module.exports = {
  printSilently,
};
