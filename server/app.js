const express = require('express');
const morgan = require('morgan');

const path = require('path');

const app = express();

// const router = require('./api/router');

app.use(morgan('dev'));
app.use('/public', express.static('./public'));
app.use(express.json());
// app.use('/api', router);

app.get('/', (req, res, next) => {
  try {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).send({ error: err.message });
});

module.exports = { app };
