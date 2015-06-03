/**
 * Vytvořil Jaroslav Klimčík dne 30.3.2015.
 */
angular.module('messages')


    .filter('cut', function () {
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    })


    .controller('MessagesController', ['$scope', '$routeParams', '$location', 'Socket', 'Authentication', 'Messages', 'Friends',
        function ($scope, $routeParams, $location, Socket, Authentication, Messages, Friends) {

            $scope.authentication = Authentication;

            var messageArray = [];

            $scope.find = function () {
                $scope.lastMessages = Messages.query();
                //console.log($scope.lastMessages);
            };

            $scope.findUserMessages = function () {
                messageQuery = Messages.query({
                    username: $routeParams.username
                }, function (item) {

                    for (var i in item) {
                        var message = item[i];
                        messageArray.push({
                            "id": message._id,
                            "message": message.message,
                            "from": message.from,
                            "to": message.to,
                            "created": message.created
                        });
                    }

                    messageArray.splice(-1, 1);
                    messageArray.splice(-1, 1);

                    $scope.messages = messageArray;
                    //console.log($scope.messages);

                });

                //console.log($scope.messages);
            };


            $scope.messages = [];
            Socket.on('chatMessagee', function (message) {
                $scope.messages.push({
                    "message": message.message,
                    "from": message.from,
                    "to": message.to,
                    "created": message.created
                });
            });


            $scope.sendMessage = function () {

                // ziskame data
                var message = new Messages({
                    message: this.message,
                    from: Authentication.user.username,
                    to: $routeParams.username
                });

                // ulozime data
                message.$save(function (response) {
                    $location.path('messages/' + response.to);
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });

                // zavolame socket.io
                Socket.emit('chatMessage', message);
                //console.log(message);

                this.message = '';
            };


            $scope.$on('$destroy', function () {
                Socket.removeListener('chatMessage');
            });
        }
    ]);