/**
 * Vytvořil Jaroslav Klimčík dne 31.3.2015.
 */
var users = require('../../app/controllers/users.server.controller'),
    messages = require('../../app/controllers/messages.server.controller');

module.exports = function (app) {
    app.route('/api/messages')
        .get(messages.list)
        .post(messages.create);

    app.route('/api/messages/:username')
        .get(users.requiresLogin, messages.read)
        .post(users.requiresLogin, messages.create);
    app.param('username', messages.messageByID);
};