/**
 * Vytvořil Jaroslav Klimčík dne 2.4.2015.
 */
angular.module('profil')
    .controller('ProfilController', ['$scope', '$routeParams', '$location', 'Socket', 'Authentication', 'Profil',
        function ($scope, $routeParams, $location, Socket, Authentication, Profil) {

            $scope.authentication = Authentication;

            $scope.find = function () {
                Profil.query({
                    username: $routeParams.username
                }, function (callback) {
                    $scope.profil = callback[0].profil[0]; // ziskat prvni objekt z pole pro profil
                    $scope.uzivatel = callback[0].user[0]; // ziskame pole s udaji uzivatele
                    //console.log(callback[0]);
                });
            };

            $scope.update = function () {
                var profil = new Profil({
                    _id: this.uzivatel._id,
                    email: this.uzivatel.email,
                    firstName: this.uzivatel.firstName,
                    lastName: this.uzivatel.lastName,
                    pohlavi: this.uzivatel.pohlavi,
                    prace: this.uzivatel.prace,
                    username: this.uzivatel.username,
                    vek: this.uzivatel.vek
                });

                //console.log(profil);


                profil.$update(function () {
                    $location.path('profil/' + $scope.uzivatel.username);
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            };

        }
    ]);