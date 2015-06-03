/**
 * Vytvořil Jaroslav Klimčík dne 3.4.2015.
 */
var users = require('../../app/controllers/users.server.controller'),
    sport = require('../../app/controllers/sport.server.controller');

module.exports = function(app) {
    app.route('/api/sport')
        .get(sport.list)
        .post(sport.create);

    app.route('/api/sport/:sportId')
        .get(sport.read)
        .put(sport.update)
        .delete(sport.delete);
    app.param('sportId', sport.sportById);

    app.route('/api/sport/advert/:sportId')
        .get(sport.read);
    app.param('sportId', sport.sportAdvertsById);
};