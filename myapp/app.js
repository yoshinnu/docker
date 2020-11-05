const createError = require('http-errors');
const express = require('express');
// const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const RegisterRouter = require('./routes/register.js');
const PostRouter = require('./routes/post.js');
const LoginRouter = require('./routes/login.js');
const EditRouter = require('./routes/edit.js')
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(__dirname + '/public'));


//新規登録
app.use('/register', RegisterRouter);
//ログイン
app.use('/', LoginRouter);
//投稿
app.use('/post', PostRouter);
//編集
app.use('/edit', EditRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {

  res.locals.error = {}
  res.render('error');

});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.error(err);
  // render the error page
  res.status(err.status || 500);

});
module.exports = app;
