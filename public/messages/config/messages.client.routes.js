/**
 * Vytvořil Jaroslav Klimčík dne 31.3.2015.
 */
angular.module('messages').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/messages', {
                templateUrl: 'messages/views/list-messages.client.view.html'
            }).when('/messages/:username', {
                templateUrl: 'messages/views/view-message.client.view.html'
            });
    }
]);