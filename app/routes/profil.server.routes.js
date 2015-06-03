/**
 * Vytvořil Jaroslav Klimčík dne 2.4.2015.
 */
var users = require('../../app/controllers/users.server.controller'),
    profil = require('../../app/controllers/profil.server.controller');

module.exports = function (app) {
    app.route('/api/profil');
    app.route('/api/profil/:username')
        .get(profil.read)
        .put(users.requiresLogin, profil.hasAuthorization, profil.update);
    app.param('username', profil.userByUsername);
};