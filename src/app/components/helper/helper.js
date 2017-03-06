'use strict';

/**
 * @author ankostyuk
 */

var _       = require('lodash'),
    angular = require('angular');

//
module.exports = angular.module('app.helper', [])
    //
    .constant('appHandledHttpErrors', [])
    //
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push(['$log', '$q', '$rootScope', 'appEvents', 'appErrors', 'appHandledHttpErrors', function($log, $q, $rootScope, appEvents, appErrors, appHandledHttpErrors) {

            function responseErrorHandler(rejection) {
                if (!_.includes(appHandledHttpErrors, rejection.status)) {
                    $rootScope.$emit(appEvents['error'], {
                        type: appErrors['response.error'],
                        rejection: rejection
                    });
                }
            }

            return {
                'responseError': function(rejection) {
                    responseErrorHandler(rejection);
                    return $q.reject(rejection);
                }
            };
        }]);
    }]);
//
