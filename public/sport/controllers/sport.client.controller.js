/**
 * Vytvořil Jaroslav Klimčík dne 3.4.2015.
 */
angular.module('sport').controller('SportController', ['$scope',
    '$routeParams', '$location', 'Authentication', 'Sport', 'ngTableParams', '$filter', 'SportAdverts',
    function ($scope, $routeParams, $location, Authentication, Sport, ngTableParams, $filter, SportAdverts) {
        $scope.authentication = Authentication;

        $scope.find = function () {
            $scope.sports = Sport.query();
        };


        var findAll = Sport.query().$promise;
        findAll.then(function onSuccess(response) {
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
            var findOne = Sport.get({
                sportId: $routeParams.sportId
            }).$promise;
            findOne.then(function onSuccess(response) {
                    $scope.sport = response;
                    console.log(response);
                },
                function onFail(response) {
                    $scope.error = response;
                });
        };

        $scope.update = function () {
            var sport = new Sport({
                _id: this.sport._id,
                nazev: this.sport.nazev
            });

            sport.$update(function () {
                $location.path('admin/sports/');
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.create = function () {
            var sport = new Sport({
                nazev: this.sport.nazev
            });

            sport.$save(function () {
                $location.path('admin/sports/');
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.removeSport = function (sportId) {
            var sport = new Sport({
                _id: sportId
            });

            sport.$remove(function () {
                $location.path('admin/sports/');
            }, function (errorResponse) {
                $scope.error = errorResponse;
            });
        };

        $scope.findSportAdverts = function () {
            var findSportAdverts = SportAdverts.query({
                sportId: $routeParams.sportId
            }).$promise;
            findSportAdverts.then(function onSuccess(response) {
                    $scope.sportAdverts = response;
                },
                function onFail(response) {
                    $scope.error = response;
                });
        };

    }
]);