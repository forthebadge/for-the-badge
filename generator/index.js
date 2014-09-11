var http = require('http');
var fs = require('fs');
var templater = require('svg-templater');

http.createServer(function(req, res) {
  var url = req.url;
  url = url.substr(1, req.url.length);

  res.writeHead(200, {
    'Content-Type': 'image/svg+xml'
  });

  var isSvg = new RegExp('.svg');


  if ( isSvg.test(url) ) {
    var data = url.replace(/%20/g,' ').replace('.svg','').split('-');
    data[2] = data[2] || '#86C8D6';
    data[3] = data[3] || '#095382';

    templater.compileFromFile('./generator/clientTemplate.svg', {data:data}, function(err, data) {
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
