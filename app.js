const express = require('express');
const morgan = require('morgan');
const { connection, seed, sync } = require('./models/db');
const router = require('./routes');
const path = require('path');

const app = express();

app.use('/api', router);
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const init = async () => {
  return sync().then(() => {
    return seed();
  });
};

init();

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`listening on port ${port}`));
