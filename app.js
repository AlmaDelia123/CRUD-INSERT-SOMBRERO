var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');

var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var sombrerosRouter = require('./routes/sombrerosRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret : '1234567890abcdefghijklmnopqrstuvwxyz',
  resave : false,
  saveUninitialized : true,
  cookie : { secure : false }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



app.use((req, res, next) => {
  if (!req.session.cart) {
      req.session.cart = [];
  }
  next();
});




app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// carga la vista inicial(login)
app.use('/', sombrerosRouter);

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


//<<<<<<< HEAD
//=======
// var conexion = require('./config/conexion');
// var mysql = require("mysql");

// var con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'chanocua24',
//   database: 'sombreros_calentanos'
// });


// con.connect(
//   (err) => {
//       if (!err) {
//           console.log('Conexion establecida http://localhost:3002');
//       } else {
//           console.log('Error de conexion');
//       }
//   });

//>>>>>>> a5eeba61ffac9bc986554ad10752699675146480
module.exports = app;


