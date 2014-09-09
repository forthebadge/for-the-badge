var express = require('express');
var app = express();
var fs = require('fs');

var public = __dirname + '/public';

app.use(express.static(public));
app.set('view engine', 'ejs');
app.set('views', public);
app.use(express.Router());

app.get('/', function(req, res) {
  fs.readdir('./public/badges', function(err, files) {
    if (err) res.send(500);
    var max = files.length;
    var holder = []
    for (var i = 0; i < max; i += 1) {
      holder.push({
        badgeName: files[i].split('.svg')[0].replace(/-/g,' '),
        badgeSrc: 'badges/' + files[i],
        badgeMrkdn: '[![forthebadge](http://forthebadge.com/badges/' + files[i] + ')](http://forthebadge.com)',
        badgeUrl: 'http://forthebadge.com/badges/' + files[i] 
      });
    }
    res.render('index', {badges: holder});  
  });
});

app.listen(3000);