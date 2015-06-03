/**
 * Vytvořil Jaroslav Klimčík dne 7.4.2015.
 */
angular.module('friends').factory('Friends', ['$resource',
    function ($resource) {
        return $resource('api/friends/:username', {
                username: '@username'
            },
            {
                update: {
                    method: 'PUT'
                }
            },
            {
                'query': {
                    method: 'GET',
                    isArray: true
                }
            }
        );
    }]);