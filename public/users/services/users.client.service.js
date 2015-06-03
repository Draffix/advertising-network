/**
 * Vytvořil Jaroslav Klimčík dne 10.4.2015.
 */
angular.module('users').factory('Users', ['$resource',
    function ($resource) {
        return $resource('api/users/:userId', {
                userId: '@_id'
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