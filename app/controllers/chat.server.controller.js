/**
 * Vytvořil Jaroslav Klimčík dne 28.3.2015.
 */
module.exports = function (io, socket) {
    socket_id = socket.id;
    //console.log(socket_id);

    clients = {};
    clients[socket.request.user.username] = socket_id;

    io.emit('chatMessage', {
        type: 'status',
        text: 'connected',
        created: Date.now(),
        username: socket.request.user.username,
        user_id: socket.request.user._id
    });
    socket.on('chatMessage', function (message) {
        if ('admin' in clients) {
            message.type = 'message';
            message.created = Date.now();
            message.username = socket.request.user.username;
            message.user_id = socket.request.user._id;
            io.emit('chatMessage', message);
        } else {
            message.type = 'message';
            message.created = Date.now();
            message.username = socket.request.user.username;
            message.user_id = socket.request.user._id;
            io.emit('chatMessage', message);
        }
    });
    socket.on('disconnect', function () {
        io.emit('chatMessage', {
            type: 'status',
            text: 'disconnected',
            created: Date.now(),
            username: socket.request.user.username
        });
    });
};