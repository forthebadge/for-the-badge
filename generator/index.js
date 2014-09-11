var http = require('http');
var fs = require('fs');
var templater = require('svg-templater');

http.createServer(function(req, res) {
  var url = req.url;
  url = url.substr(1, req.url.length);

  var filepath = __dirname +'/clientTemplate.svg';
  
  res.writeHead(200, {
    'Content-Type': 'image/svg+xml'
  });

  var isSvg = new RegExp('.svg');


  if ( isSvg.test(url) ) {
    var badgeText = url.split('-');
    var colors = url.split(':')[1].split('-');
    
    templater.compileFromFile('./generator/clientTemplate.svg', {text:badgeText, colors: colors}, function(err, data) {
      if (err) {
        res.write(err);
        res.end();
      }
      else if (data) {
        res.write(data);
        res.end();     
      }
    });
  }
  
}).listen(2000)
