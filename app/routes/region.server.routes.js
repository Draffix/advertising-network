/**
 * Vytvořil Jaroslav Klimčík dne 3.4.2015.
 */
var users = require('../../app/controllers/users.server.controller'),
    region = require('../../app/controllers/region.server.controller');

module.exports = function(app) {
    app.route('/api/region')
        .get(region.list)
        .post(region.create);

    app.route('/api/region/advert/:regionId')
        .get(region.read);
    app.param('regionId', region.regionAdvertsById);
};