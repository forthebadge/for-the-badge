var http = require('http');
var templater = require('lodash-template-stream');
var fs = require('fs');


http.createServer(function(req, res) {
  
  var url = req.url;
  url = url.substr(1, req.url.length);
  
  var isSvg = new RegExp('.svg');


  if (!url) {
    res.write('no svg input given');
    res.end();
  }
  if (!isSvg.test(url)) {
    res.write('no svg input given');
    res.end(); 
  }


  res.writeHead(200, {'Content-Type': 'image/svg+xml'});

  if ( isSvg.test(url) ) {
    var data = url
      .replace(/%20/g,' ')
      .replace(/!/g,'#')
      .replace('.svg','')
      .split('-');
    
    data[2] = data[2] || '#86C8D6';
    data[3] = data[3] || '#095382';

    var read = fs.createReadStream('./generator/clientTemplate.svg');
    read
      .pipe(templater({data: data}))
      .pipe(res);
  }
  
}).listen(3000);
