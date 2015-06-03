/**
 * Vytvořil Jaroslav Klimčík dne 29.3.2015.
 */
angular.module('chat').controller('ChatController', ['$scope', '$routeParams', '$location', 'Socket', 'Authentication',
    function ($scope, $routeParams, $location, Socket, Authentication) {

        $scope.authentication = Authentication;

        //$scope.messages = [];
        //Socket.on('chatMessage', function (message) {
        //    $scope.messages.push(message);
        //});
        //
        //$scope.sendMessage = function () {
        //    var message = {
        //        text: this.messageText,
        //    };
        //
        //    Socket.emit('chatMessage', message);
        //
        //    this.messageText = '';
        //}
        //
        //$scope.$on('$destroy', function () {
        //    Socket.removeListener('chatMessage');
        //})

        ////socket.io pro online uzivatele
        //Socket.on('onlineUsers', function (clients) {
        //    if (Authentication.user.username in clients) {
        //        delete clients[Authentication.user.username];
        //    }
        //    $scope.clients = clients;
        //});
    }
]);