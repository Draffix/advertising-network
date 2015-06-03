/**
 * Vytvořil Jaroslav Klimčík dne 2.4.2015.
 */
angular.module('profil').factory('Profil', ['$resource',
    function ($resource) {
        return $resource('api/profil/:username', {
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