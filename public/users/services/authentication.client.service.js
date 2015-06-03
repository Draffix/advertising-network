/**
 * Vytvořil Jaroslav Klimčík dne 28.3.2015.
 */
angular.module('users').factory('Authentication', [
    function () {
        this.user = window.user;
        return {
            user: this.user
        };
    }
]);