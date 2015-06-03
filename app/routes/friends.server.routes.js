/**
 * Vytvořil Jaroslav Klimčík dne 6.4.2015.
 */
var users = require('../../app/controllers/users.server.controller'),
    friends = require('../../app/controllers/friends.server.controller');

module.exports = function (app) {
    app.route('/api/friends/:username')
        .get(friends.read)
        .post(users.requiresLogin, friends.create)
        .put(friends.update);
    app.param('username', friends.friendsByUsername);
};