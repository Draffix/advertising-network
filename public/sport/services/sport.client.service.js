/**
 * Vytvořil Jaroslav Klimčík dne 3.4.2015.
 */
angular.module('sport')

    .factory('Sport', ['$resource', function ($resource) {
        return $resource('api/sport/:sportId', {
                sportId: '@_id'
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
    }])
    .factory('SportAdverts', ['$resource', function ($resource) {
        return $resource('/api/sport/advert/:sportId', {
                sportId: '@_id'
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
    }])
;