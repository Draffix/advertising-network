/**
 * Vytvořil Jaroslav Klimčík dne 10.4.2015.
 */
angular.module('region').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/region/advert/:regionId', {
                templateUrl: 'region/views/list-region.client.view.html'
            });
    }
]);