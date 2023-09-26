const express = require('express');
const bodyParser = require('body-parser');
const { createTempFile, deleteTempFile } = require('./src/file-service');
const { printSilently } = require('./src/print-service');
const { printBuilder } = require('./src/print-builder');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/print', async (req, res) => {
  let file = null;
  try {
    const order = req.body;
    const text = printBuilder(order);
    file = await createTempFile(text);

    if (file) {
      printSilently(file);

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
  } finally {
  }
});

app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
});
