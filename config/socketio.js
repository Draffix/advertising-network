/**
 * Vytvořil Jaroslav Klimčík dne 28.3.2015.
 */
var config = require('./config'),
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    messages = require('../app/controllers/messages.server.controller');

module.exports = function (server, io, mongoStore) {
    io.use(function (socket, next) {
        cookieParser(config.sessionSecret)(socket.request, {},
            function (err) {
                var sessionId = socket.request.signedCookies['connect.sid'];
                mongoStore.get(sessionId, function (err, session) {
                    socket.request.session = session;
                    passport.initialize()(socket.request, {}, function () {
                        passport.session()(socket.request, {}, function () {
                            if (socket.request.user) {
                                next(null, true);
                            } else {
                                next(new Error('User is not authenticated'), false);
                            }
                        })
                    });
                });
            });
    });

    var clients = {};

    io.on('connection', function (socket) {

        console.info('New client connected (id=' + socket.id + ').');
        // after connect set socket ID to username
        clients[socket.request.user.username] =
        {
            username: socket.request.user.username,
            socket_id: socket.id,
            status: 'online'
        };


        // ukaz online uzivatele
        io.emit('onlineUsers', clients);
        //console.log(clients);

        // pri pridani pritele
        socket.on('updateFriends', function () {
            io.emit('onlineUsers', clients);
        });


        socket.on('updateAdverts', function (advert) {
            io.emit('updateAdverts', advert);
        });


        // posli zpravu
        socket.on('chatMessage', function (message) {
            io.emit('chatMessagee', message);
        });


        socket.on('disconnect', function () {

            clients[socket.request.user.username]['status'] = 'offline';

            //delete clients[socket.request.user.username];
            io.emit('onlineUsers', clients);
        });
    });
};