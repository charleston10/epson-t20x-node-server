const express = require('express');
const bodyParser = require('body-parser');
const { print } = require('./src/print-service');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/print', async (req, res) => {
  try {
    if (req.body.text) {
      return print(req, res, req.body.text, false);
    }

    throw Error('No text to print.');
  } catch (e) {
    return res.status(500).send({
      message: 'Error printing.',
    });
  }
});

app.post('/print/order', async (req, res) => {
  try {
    return print(req, res, req.body, true);
  } catch (e) {
    return res.status(500).send({
      message: 'Error printing.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on the port ${PORT}`);
});
