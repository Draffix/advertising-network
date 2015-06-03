/**
 * Vytvořil Jaroslav Klimčík dne 3.4.2015.
 */
angular.module('region').controller('RegionController', ['$scope',
    '$routeParams', '$location', 'Authentication', 'Region', 'RegionAdverts',
    function ($scope, $routeParams, $location, Authentication, Region, RegionAdverts) {
        $scope.authentication = Authentication;

        $scope.find = function () {
            $scope.regions = Region.query();
        };

        $scope.findRegionAdverts = function () {
            var findRegionAdverts = RegionAdverts.query({
                regionId: $routeParams.regionId
            }).$promise;
            findRegionAdverts.then(function onSuccess(response) {
                    $scope.regionAdverts = response;
                },
                function onFail(response) {
                    $scope.error = response;
                });
        };
    }
]);