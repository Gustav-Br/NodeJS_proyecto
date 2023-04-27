var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/productos');
var categoryRouter = require('./routes/categories');
const jwt = require("jsonwebtoken");

var app = express();

app.set("secretKey","gsb232")

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/productos', verifyToken, productRouter);   antes tenia que estar autenticado para acceder a /productos
app.use('/productos', productRouter);
app.use('/index', indexRouter);
app.use('/categorias', categoryRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


function verifyToken(req, res, next){
   jwt.verify(req.headers["x-access-token"], req.app.get("secretKey"), function(err, payload){
    if(err){
      console.log("No se verificó el token !")
      res.status(401).json({error: err.message})
    }else{
      console.log("payload:",payload)
      req.body.userId = payload.userId
      next()
    }
   })
}

app.verifyToken = verifyToken


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error: err.message});
});

module.exports = app;
