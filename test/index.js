var assert = require('assert');
var helpers = require('../helpers');
var request = require('request');
var server = require('../server');
server.listen(3000);


describe('Application', function() {
  
  it('should be up', function(done) {
    request('http://localhost:3000/', function(e, r, b) {
      assert(r.statusCode, 200);
      return done();
    });
  });
});

describe('Badges', function() {

  helpers.getBadges('./public/badges', function(err, files) {
    if (err) return done(err);
    var badges = files.badges;
    for (var i in badges) {
      it('should exist', function(done) {
        request('http://localhost:3000/' + badges[i].src, function(e, r, b) {
          assert(r.statusCode, 200);
          return done();
        });
      });
    }
  });
});