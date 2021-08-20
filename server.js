var express    = require('express');
var app        = express();
var path       = require('path');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');

// Database
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/hoseoproject?retryWrites=true&w=majority', {useMongoClient: true});
var db = mongoose.connection;
db.once('open', function () {
   console.log('DB connected!');
});
db.on('error', function (err) {
  console.log('DB ERROR:', err);
});

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'content-type, x-access-token');
  next();
});

// API
app.use('/api/users', require('./api/users'));
app.use('/api/auth', require('./api/auth'));

// Server
var port = 3000;
app.listen(port, function(){
  console.log('listening on port:' + port);
});
