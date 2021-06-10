const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { crawlerController } = require('./controllers');
const { crawlerValidation } = require('./middlewares');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: '*',
  }),
);

app.get('/:pageNumber', crawlerValidation, crawlerController.crawler);
app.get('/', crawlerValidation, crawlerController.crawler);

module.exports = {
  app: app,
};
