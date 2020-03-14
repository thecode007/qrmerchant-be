var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var port        = process.env.PORT || 8080;
var passport	= require('passport');
var router      = require('./routes')

 
// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// log to console
app.use(morgan('dev'));
// Use the passport package in our application
app.use(passport.initialize());
 
// demo Route
app.get('/', function(req, res) {
  res.send('Hello QR coder');
});

  
app.use('/api', router);
// Start the server
app.listen(port);
