'use strict';

/**
 * @author ankostyuk
 */

var appInfo = require('info/info');

var _       = require('lodash'),
    angular = require('angular');

require('bootstrap/dist/css/bootstrap.css');
require('./styles/app.less');

var ngModules = [
    require('i18n-app/i18n'),

    require('commons-angular/directives/directives'),

    require('app/components/helper/helper'),
    require('app/components/lang/lang'),
    require('app/components/message/message'),

    require('app/components/travel/travel'),

    require('utils/utils')
];

angular.module('app', _.map(ngModules, 'name'))
    //
    .constant('appConfig', {
        name: _tr('app.name'),
        resource: {},
        readyDelay: 500
    })
    .constant('appEvents', {
        'ready': 'app.ready',
        'error': 'app.error'
    })
    //
    .constant('appErrors', {
        'response.error': 'app.response.error'
    })
    //
    .config(['$qProvider', '$logProvider', '$compileProvider', function($qProvider, $logProvider, $compileProvider) {
        $qProvider.errorOnUnhandledRejections(!CONFIG.PRODUCTION);

        $logProvider.debugEnabled(!CONFIG.PRODUCTION);

        $compileProvider.debugInfoEnabled(!CONFIG.PRODUCTION);
        $compileProvider.commentDirectivesEnabled(!CONFIG.PRODUCTION);
        $compileProvider.cssClassDirectivesEnabled(!CONFIG.PRODUCTION);
    }])
    //
    .run(['$log', '$rootScope', '$timeout', 'appConfig', 'appEvents', 'i18nService', function($log, $rootScope, $timeout, appConfig, appEvents, i18nService) {
        _.extend($rootScope, {
            appConfig: appConfig,
            app: {
                info: appInfo,
                lang: i18nService.getLang(),
                ready: false
            },
            isAppReady: function() {
                return $rootScope.app.ready;
            }
        });

        $timeout(function() {
            $rootScope.app.ready = true;
            $rootScope.$emit(appEvents['ready']);
        }, appConfig.readyDelay);
    }]);
//

angular.bootstrap(document, ['app'], {
    strictDi: true
});

// Analytics
require('./analytics');
