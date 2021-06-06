var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { ipcMain } = require('electron');
const ipfs = require('ipfs-api')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
ipcMain.handle('status',async event =>{
  try{
    const id = await ipfs.id()
    return id
  }catch(err){
    console.error(err);
    return err
  }
})
ipcMain.handle('pininfo',async event =>{
  try{
    let pinList = await ipfs.pin.ls({type:'recursive' })
    let stats = await ipfs.stats.repo()
    let RepoSize = stats.repoSize
    let NumObjects = stats.numObjects
    let pinInfo = {pinList,RepoSize,NumObjects}
    return pinInfo
  }catch(err){
    console.error(err);
    return err
  }
})
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
