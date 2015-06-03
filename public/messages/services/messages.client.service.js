/**
 * Vytvořil Jaroslav Klimčík dne 1.4.2015.
 */
angular.module('messages').factory('Messages', ['$resource',
    function ($resource) {
        return $resource('api/messages/:username', {
                username: '@username'
            },
            {
                'query': {
                    method: 'GET',
                    isArray: true
                }
            }
        );
    }]);