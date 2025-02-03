var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sequelize = require('./config/database')
const customLogger = require('./logger')
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const blogRouter = require('./routes/blog')

var app = express();

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

try {
   sequelize.authenticate()
   .then(
    console.log('Connection has been established successfully.')
   )
  
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

mongoose.connect('')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter)
app.use('/blog', blogRouter)
app.use(customLogger)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
