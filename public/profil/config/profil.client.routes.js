/**
 * Vytvořil Jaroslav Klimčík dne 2.4.2015.
 */
angular.module('profil').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/profil/:username', {
                templateUrl: 'profil/views/list-profil.client.view.html'
            }).
            when('/profil/:username/edit', {
                templateUrl: 'profil/views/edit-profil.client.view.html'
            });
    }
]);