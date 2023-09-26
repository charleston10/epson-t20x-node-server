const { spawn } = require('child_process');
const config = require('../config');
const { printBuilder } = require('./print-builder');
const { createTempFile, deleteTempFile } = require('./file-service');

function cmdPrint(filePath) {
  const process = spawn(config.printFileDir, [filePath], {
    detached: true,
    stdio: 'ignore',
    windowsHide: true,
  });

  process.unref();
}

async function print(req, res, content, isOrder = false) {
  let file = null;
  try {
    file = await createTempFile(isOrder ? printBuilder(content) : content);

    if (file) {
      cmdPrint(file);

      //remove temporary file after 10 seconds
      setTimeout(() => {
        deleteTempFile(file);
      }, 10000);

      return res.send({
        message: 'Print sent to queue.',
        file: file,
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: 'Error creating temporary file.',
      error: err,
    });
  }
}

module.exports = {
  print,
};
