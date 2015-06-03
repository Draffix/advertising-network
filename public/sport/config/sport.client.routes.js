/**
 * Vytvořil Jaroslav Klimčík dne 10.4.2015.
 */
angular.module('sport').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/sport/advert/:sportId', {
                templateUrl: 'sport/views/list-sport.client.view.html'
            })
            .when('/sporty/', {
                templateUrl: 'sport/views/sport.client.view.html'
            });
    }
]);