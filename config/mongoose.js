/**
 * Vytvořil Jaroslav Klimčík dne 26.3.2015.
 */
var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function () {
    var db = mongoose.connect(config.db);

    require('../app/models/user.server.model');
    require('../app/models/article.server.model');
    require('../app/models/messages.server.model');
    require('../app/models/sport.server.model');
    require('../app/models/region.server.model');
    require('../app/models/advert.server.model');
    require('../app/models/friend.server.model');

    return db;
};