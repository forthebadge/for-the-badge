var express = require('express');
var app = express();
var helpers = require('./helpers');
var compress = require('compression');
var fs = require('fs');
var templater = require('svg-templater');


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

app.get('/generate/:badgeText/:color1?/:color2?', function(req, res) {
  res.type('image/svg+xml;charset=utf-8');


  if (!req.params.badgeText || req.params.badgeText.split('-').length <= 1) {
    res.send('Malformed badge, need a dash between text');
  }
  var badgeText = req.params.badgeText.split('-');
  var color1 = req.params.color1 || '#EA4460';
  var color2 = req.params.color2 || '#C13A3A';

  templater.compileFromFile('./generator/clientTemplate.svg', {text:badgeText, color1: color1, color2: color2}, function(err, data) {
    if (err) res.send(err);
    if (data) {
      res.send(data)
    }
  });  
});




app.listen(3000);



module.exports = app;