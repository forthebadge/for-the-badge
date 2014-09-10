var express = require('express');
var app = express();
var helpers = require('./helpers');
var compress = require('compression');


var public = __dirname + '/public';
app.disable('x-powered-by');
app.set('view engine', 'ejs');
app.set('views', public + '/views');
app.use(compress());
app.use(express.static(public, {maxAge: 86400000} ));
app.use(express.Router());



app.get('/', function(req, res) {
  
  helpers.getBadges('./public/badges', function(err, badges) {
    if (err) res.send(err);
    res.render('index', badges);
  });
});


app.all('/*', function(req, res) {
  res.redirect('/');
});

app.listen(3000);

exports.app = app;