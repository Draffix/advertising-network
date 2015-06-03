/**
 * Vytvořil Jaroslav Klimčík dne 28.3.2015.
 */
angular.module('advert')

    .directive('googleplace', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, model) {
                var options = {
                    types: ['(cities)'],
                    componentRestrictions: {country: "cz"}
                };
                scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

                google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                    scope.$apply(function () {
                        model.$setViewValue(element.val());
                    });
                });
            }
        };
    })

    .controller('AdvertController', ['$scope',
        '$routeParams', '$location', 'Authentication', 'Advert', 'Socket', 'ngTableParams', '$filter',
        function ($scope, $routeParams, $location, Authentication, Advert, Socket, ngTableParams, $filter) {
            $scope.authentication = Authentication;


            var notifications = [];

            var find = Advert.query().$promise;
            find.then(function onSuccess(response) {
                    // access data from 'response'
                    $scope.adverts = response;

                    $scope.notifications = notifications;
                    $scope.activeNotificitaion = false;

                    Socket.on('updateAdverts', function (advert) {
                        //console.log('inzerat byl pridan');
                        //console.log($scope.adverts);
                        $scope.adverts.push(advert);
                        $scope.notifications.push(advert);
                        $scope.activeNotificitaion = true;

                        console.log($scope.notifications);
                    });

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

                    //console.log(response);
                },
                function onFail(response) {
                    $scope.error = response;
                });


            $scope.findOne = function () {
                Advert.query({
                    username: $routeParams.username
                }, function (callback) {
                    $scope.advert = callback[0]; // ziskat prvni objekt z pole

                    //console.log(callback[0]);

                    // sport list
                    if (callback[0].sport_list) {
                        $scope.sportList = callback[0].sport_list;
                    }

                    if (callback[0].advert) { // pokud existuje inzerat uzivatele
                        //console.log($scope.advert);

                        // city select
                        $scope.chosenPlace = callback[0].advert.city;


                        // region select
                        if (callback[0].advert.region.nazev) {
                            $scope.selectedRegion.selected = {
                                nazev: callback[0].advert.region.nazev,
                                _id: callback[0].advert.region._id
                            };
                        }

                        // sport select
                        if (callback[0].advert.sport) {
                            $scope.selectedSport.selected = callback[0].advert.sport;
                        }

                    }

                });
            };


            $scope.selectedRegion = {};
            $scope.selectedSport = [];


            $scope.update = function () {

                var city = this.chosenPlace.split(",");

                var advert = new Advert({
                    created: new Date(),
                    _id: this.advert.advert._id,
                    title: this.advert.advert.title,
                    advert: this.advert.advert.advert,
                    city: city[0],
                    user: Authentication.user._id,
                    sport: $scope.selectedSport.selected,
                    region: $scope.selectedRegion.selected._id,
                    username: Authentication.user.username
                });

                advert.$update(function () {
                    $location.path('profil/' + Authentication.user.username);
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            };

            $scope.updateFromAdmin = function () {

                var city = this.chosenPlace.split(",");

                var advert = new Advert({
                    created: new Date(),
                    _id: this.advert.advert._id,
                    title: this.advert.advert.title,
                    advert: this.advert.advert.advert,
                    city: city[0],
                    user: this.advert.advert.user._id,
                    sport: $scope.selectedSport.selected,
                    region: $scope.selectedRegion.selected._id,
                    username: this.advert.advert.user.username
                });

                //console.log(advert);

                advert.$update(function () {
                    $location.path('admin/adverts/');
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            };

            $scope.removeAdvert = function () {
                var advert = new Advert({
                    username: Authentication.user.username,
                    _id: this.advert.advert._id
                });

                //console.log(advert);

                advert.$remove(function () {
                    $location.path('profil/' + Authentication.user.username);
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            };


            $scope.removeAdvertFromAdmin = function (advertId, userName) {
                var advert = new Advert({
                    username: userName,
                    _id: advertId
                });

                console.log(advert);

                advert.$remove(function () {
                    $location.path('admin/adverts/');
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            };


            $scope.findToCreate = function () {
                Advert.query({
                    username: $routeParams.username
                }, function (callback) {
                    $scope.advert = callback[0]; // ziskat prvni objekt z pole

                    //console.log($scope.advert);

                });
            };

            $scope.create = function () {

                var city = this.chosenPlace.split(",");
                var title = this.advert.advert.title;
                var newText = this.advert.advert.advert;

                var advert = new Advert({
                    title: this.advert.advert.title,
                    advert: this.advert.advert.advert,
                    city: city[0],
                    user: Authentication.user._id,
                    sport: $scope.selectedSport,
                    region: $scope.selectedRegion.selected._id,
                    username: Authentication.user.username
                });

                advert.$save(function () {

                    Socket.emit('updateAdverts', advert);

                    $location.path('profil/' + Authentication.user.username);
                }, function (errorResponse) {
                    $scope.error = errorResponse.data.message;
                });
            };

        }
    ]);