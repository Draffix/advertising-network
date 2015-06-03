/**
 * Vytvořil Jaroslav Klimčík dne 10.4.2015.
 */
angular.module('admin').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/admin/users/', {
                templateUrl: 'admin/views/admin-users.client.view.html'
            })
            .when('/admin/users/:userId/edit', {
                templateUrl: 'admin/views/admin-users-edit.client.view.html'
            })
            .when('/admin/sports/', {
                templateUrl: 'admin/views/admin-sports.client.view.html'
            })
            .when('/admin/sports/:sportId/edit', {
                templateUrl: 'admin/views/admin-sports-edit.client.view.html'
            })
            .when('/admin/sports/create', {
                templateUrl: 'admin/views/admin-sports-create.client.view.html'
            })
            .when('/admin/adverts/', {
                templateUrl: 'admin/views/admin-adverts.client.view.html'
            })
            .when('/admin/adverts/:username/edit', {
                templateUrl: 'admin/views/admin-adverts-edit.client.view.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);