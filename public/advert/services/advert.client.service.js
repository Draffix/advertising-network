/**
 * Vytvořil Jaroslav Klimčík dne 4.4.2015.
 */
angular.module('advert').factory('Advert', ['$resource',
    function ($resource) {
        return $resource('api/advert/:username', {
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
                    isArray: false
                }
            }
        );
    }]);