var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var User = require('./model.js').User;

var app = express();

var bcrypt = require('bcrypt');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "cats" , resave: false,
  saveUninitialized: true}));
app.use(express.static(path.join(__dirname, 'public')));

var passport = require('passport');
var LocalStrategy = require('passport-local');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({username: username}).then(function (u) {
      if (u){
        bcrypt.compare(password, u.password, function(err, res) {
          if (res == true){
            done(null, u);
          }
          else{
              done(null, false);
          }
        });
      }

      else {
        done(null, false);
      }
    });

  }));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) { done(err, user); });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
