var assert = require('assert');
var helpers = require('../helpers');
var request = require('request');
var server = require('../server');


describe('Server', function() {
  server.app.listen(3000);

  it('should be up', function(done) {
    request('http://localhost:3000/', function(e, r, b) {
      assert(r.statusCode, 200);
      return done();
    })  
  });

  it('should be able to load badges and the helper should work', function(done) {
    helpers.getBadges('./public/badges', function(err, files) {
      if (err) return done(err);
      var badge = files.badges
      request('http://localhost:3000/'+badge[0].src, function(e, r, b) {
        if (err) return done(err);
        assert(r.statusCode, 200);
        done();
      });
    });
  });
  
});