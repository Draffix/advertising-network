/**
 * Vytvořil Jaroslav Klimčík dne 7.4.2015.
 */
angular.module('friends')
    .controller('FriendsController', ['$scope', '$routeParams', '$location', 'Socket', 'Authentication', 'Friends',
        function ($scope, $routeParams, $location, Socket, Authentication, Friends) {

            //console.log(Authentication.user.username);
            //console.log($routeParams.username);
            //socket.io pro online uzivatele
            Socket.on('onlineUsers', function (clients) {

                if (Authentication.user) {
                    // vymazeme prihlaseneho ze seznamu
                    if (Authentication.user.username in clients) {
                        delete clients[Authentication.user.username];
                    }

                    var onlineFriends = [];
                    // vyfiltrujeme pouze pratele
                    Friends.query({
                        username: Authentication.user.username
                    }, function (callback) {
                        userFriends = callback[0].friends; // ziskame pole s prateli a udajich o nich

                        // loop pro prihlasene
                        for (var key in clients) {
                            if (clients.hasOwnProperty(key)) {

                                // loop pro pratele
                                for (var index = 0; index < userFriends.length; index++) {
                                    var item = userFriends[index];

                                    if (item.username == clients[key].username) {
                                        onlineFriends.push(clients[key]);
                                    }
                                }

                            }
                        }

                        $scope.clients = onlineFriends;

                    });
                }

            });


            $scope.findFriends = function () {
                Friends.query({
                    username: $routeParams.username
                }, function (callback) {
                    $scope.friends = callback[0]; // ziskame pole s prateli a udajich o nich
                });
            };

            $scope.addFriend = function (friendId) {

                var friends = new Friends();
                friends.username = Authentication.user.username;
                friends.friendId = friendId;

                friends.$save(function () {

                    // aktualizace online pratel
                    Socket.emit('updateFriends');

                    $location.path('profil/' + Authentication.user.username);
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            };


            $scope.removeFriend = function (friendId, friendsId) {

                var friends = $scope.friends;
                friends.username = $scope.friends.userName;
                friends.friendId = friendId;
                friends.friendsId = friendsId;

                friends.$update(function () {

                    // aktualizace online pratel
                    Socket.emit('updateFriends');

                    $location.path('profil/' + Authentication.user.username);
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });

            };
        }
    ]);