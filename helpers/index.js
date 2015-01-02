var fs = require('fs');

exports.getBadges = function(dir, callback) {

  fs.readdir(dir, function(err, files) {
    if (err) {
      return callback(err);
    }
    if (!files) {
      return callback(new Error('no files'));
    }

    var max = files.length;
    var holder = [];

    for (var i = 0; i < max; i += 1) {
      holder.push({
        badgeName: files[i].split('.svg')[0].replace(/-/g,' '),
        badgeSrc: ['badges/', files[i]].join(''),
        badgeMrkdn: ['[![forthebadge](http://forthebadge.com/badges/', files[i], ')](http://forthebadge.com)'].join(''),
        badgeUrl: ['http://forthebadge.com/badges/', files[i] ].join('')
      });
    }

    return callback(null, {badges: holder});

  });
};
