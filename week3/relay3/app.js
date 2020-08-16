const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
var cors = require('cors')

const searchRouter = require('./routes/search');
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();
const port = 80;

app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/search', searchRouter);

app.use((req, res) => {
  res.status(404);
  res.send("404 ERROR");
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send("500 ERROR");
});

app.listen(port, () => {
  console.log(`running at port ${port}`);
});

module.exports = app;
