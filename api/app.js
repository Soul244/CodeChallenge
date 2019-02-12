const express = require('express');

const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const options = {
  useNewUrlParser: true,
  reconnectTries: 10,
  reconnectInterval: 500,
  poolSize: 10,
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4,
};

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.DB_HOST, options);

const googleRoutes = require('./routes/google')
const tasksRoutes = require('./routes/tasks');
const usersRoutes = require('./routes/users');

app.use(cors({ credentials: true, origin: true }));
app.use(morgan('dev'));
app.disable('etag');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/google', googleRoutes);
app.use('/tasks', tasksRoutes);
app.use('/users', usersRoutes);

app.use((res,req,next) => {
  const error = new Error('Couldnt find endpoint');
  error.status = 404;
  next(error);
});

app.use((error, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
