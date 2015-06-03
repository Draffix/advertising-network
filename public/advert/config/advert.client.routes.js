/**
 * Vytvořil Jaroslav Klimčík dne 28.3.2015.
 */
angular.module('advert').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'advert/views/advert.client.view.html'
            })
            .when('/inzerat/:username/edit', {
                templateUrl: 'advert/views/edit-advert.client.view.html'
            })
            .when('/inzerat/:username/add', {
                templateUrl: 'advert/views/add-advert.client.view.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);