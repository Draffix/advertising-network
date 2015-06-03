/**
 * Vytvořil Jaroslav Klimčík dne 26.3.2015.
 */
module.exports = function (app) {
    var index = require('../controllers/index.server.controller');
    app.get('/', index.render);
};