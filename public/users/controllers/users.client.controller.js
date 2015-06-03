/**
 * Vytvořil Jaroslav Klimčík dne 10.4.2015.
 */
angular.module('users').controller('UsersController', ['$scope',
    '$routeParams', '$location', 'Authentication', 'Users', 'ngTableParams', '$filter',
    function ($scope, $routeParams, $location, Authentication, Users, ngTableParams, $filter) {
        $scope.authentication = Authentication;

        var find = Users.query().$promise;
        find.then(function onSuccess(response) {
                //$scope.users = response;
                //console.log(response);

                $scope.tableParams = new ngTableParams({
                    page: 1,            // show first page
                    count: 10,          // count per page
                    sorting: {
                        name: 'asc'     // initial sorting
                    }
                }, {
                    total: response.length, // length of data
                    getData: function ($defer, params) {
                        // use build-in angular filter
                        var filteredData = params.filter() ?
                            $filter('filter')(response, params.filter()) :
                            response;
                        var orderedData = params.sorting() ?
                            $filter('orderBy')(filteredData, params.orderBy()) :
                            response;

                        params.total(orderedData.length); // set total for recalc pagination
                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            },
            function onFail(response) {
                $scope.error = response;
            });


        $scope.findOne = function () {
            var findOne = Users.get({
                userId: $routeParams.userId
            }).$promise;
            findOne.then(function onSuccess(response) {
                    $scope.uzivatel = response;
                    //console.log(response);
                },
                function onFail(response) {
                    $scope.error = response;
                });
        };

        $scope.update = function () {
            var user = new Users ({
                _id: this.uzivatel._id,
                email: this.uzivatel.email,
                firstName: this.uzivatel.firstName,
                lastName: this.uzivatel.lastName,
                pohlavi: this.uzivatel.pohlavi,
                prace: this.uzivatel.prace,
                username: this.uzivatel.username,
                vek: this.uzivatel.vek
            });

            user.$update(function () {
                $location.path('admin/users/');
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.removeUser = function (userId) {
            var user = new Users({
                _id: userId
            });

            //console.log(user);

            user.$remove(function () {
                $location.path('admin/users/');
            }, function (errorResponse) {
                $scope.error = errorResponse;
            });
        };
    }
]);