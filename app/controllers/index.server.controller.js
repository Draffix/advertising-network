/**
 * Vytvořil Jaroslav Klimčík dne 26.3.2015.
 */
exports.render = function (req, res) {
    res.render('index', {
        title: 'Hello World',
        user: JSON.stringify(req.user)
    });
};