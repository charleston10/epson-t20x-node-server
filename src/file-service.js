const fs = require('fs');
const os = require('os');
const path = require('path');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);
const unlinkAsync = util.promisify(fs.unlink);

async function createTempFile(content) {
  const tempFileName = path.join(
    os.tmpdir(),
    'tempFile_' + Date.now() + '.txt',
  );

  try {
    await writeFileAsync(tempFileName, content);
    console.log('Temporary file written to:', tempFileName);
    return tempFileName;
  } catch (err) {
    console.error('Error writing temporary file:', err);
  }
}

async function deleteTempFile(tempFileName) {
  try {
    await unlinkAsync(tempFileName);
    console.log('Temporary file removed:', tempFileName);
  } catch (err) {
    console.error('Error removing temporary file:', err);
  }
}

module.exports = {
  createTempFile,
  deleteTempFile,
};
