/**
 * Vytvořil Jaroslav Klimčík dne 3.4.2015.
 */
var users = require('../../app/controllers/users.server.controller'),
    advert = require('../../app/controllers/advert.server.controller');

module.exports = function (app) {
    app.route('/api/advert')
        .get(advert.list)
        .post(advert.create);

    app.route('/api/advert/:username')
        .get(advert.read)
        .post(advert.create)
        .put(advert.update)
        .delete(advert.delete);
    app.param('username', advert.advertByID);
};