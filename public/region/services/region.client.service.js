/**
 * Vytvořil Jaroslav Klimčík dne 3.4.2015.
 */
angular.module('region')

    .factory('Region', ['$resource', function ($resource) {
        return $resource('api/region/:nazev', {
                nazev: '@nazev'
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

    .factory('RegionAdverts', ['$resource', function ($resource) {
        return $resource('/api/region/advert/:regionId', {
                regionId: '@_id'
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