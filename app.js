var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('Quiz 2015'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));



//Helpers dinámicos:
app.use(function(req, res, next) {
          // Guardar path en session.redir para después
          // de hacer login válido.
          if (!req.path.match(/\/login|\/logout/)) {
            req.session.redir = req.path;
          }

          // Hacer visible req.session en las vistas.
          res.locals.session = req.session;
          next();
        }
);

app.use(function(req, res, next) {
  var sesion = req.session || null;

  if (sesion === "undefined" ) return next();
  if (!sesion.user || !sesion.activa) return next();

  var horaActual = new Date();
  console.log("Hora Actual:" + horaActual.getTime());
  console.log("Hora Login:" + sesion.loginTime);
  if ( (horaActual.getTime() - sesion.loginTime ) > 60000) {
    sesion.activa = false;
    res.redirect('/logout');
    //return;
  }
  next();
});

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      errors:[]
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    errors:[]
  });
});


module.exports = app;

function random(seed) {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}