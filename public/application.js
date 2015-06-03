/**
 * Vytvořil Jaroslav Klimčík dne 28.3.2015.
 */
var mainApplicationModuleName = 'partak';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource', 'ngRoute', 'ngSanitize', 'users',
    'articles', 'chat', 'messages', 'profil', 'relativeDate', 'sport', 'region', 'advert', 'ui.select', 'friends', 'admin', 'ngTable']);

// prelozeni angular-relative-date do cestiny
mainApplicationModule
    .value('relativeDateTranslations', {
        just_now: 'právě teď',
        seconds_ago: 'před {{time}} vteřinami',
        a_minute_ago: 'před minutou',
        minutes_ago: ' před {{time}} min',
        an_hour_ago: 'před hodinou',
        hours_ago: 'před {{time}} hod',
        a_day_ago: 'včera',
        days_ago: 'před {{time}} dny',
        a_week_ago: 'před týdnem',
        weeks_ago: 'před {{time}} týdny'
    });

mainApplicationModule.config(['$locationProvider',
    function ($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);

if (window.location.hash === '#_=_') window.location.hash = '#!';

angular.element(document).ready(function () {
    angular.bootstrap(document, [mainApplicationModuleName]);
});