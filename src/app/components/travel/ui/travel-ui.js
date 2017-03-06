'use strict';

/**
 * @author ankostyuk
 */

var _       = require('lodash'),
    i18n    = require('i18n'),
    angular = require('angular');

// ui-select
require('ui-select');
require('ui-select/dist/select.css');

var templates = {
    'travel-point': require('./views/travel-point.html'),
    'travel-form': require('./views/travel-form.html')
};

module.exports = angular.module('app.travel.ui', ['ui.select'])
    //
    .run(['utils', function(utils) {
        utils.translateTemplates(templates);
    }])
    //
    .controller('appTravelFormController', ['$scope', 'travelService', function($scope, travelService) {
        //
        _.extend($scope, {
            travel: {
                departure: null,
                arrival: null,
                numberOfPassengers: null
            },
            passengers: _.range(1, $scope.maxPassengers + 1),
            refreshDelay: 500
        }, i18n.translateFuncs);

        //
        $scope.isDepartureEqualArrival = function() {
            var d = _.get($scope.travel, 'departure.iata'),
                a = _.get($scope.travel, 'arrival.iata');

            return d && d === a;
        }

        $scope.submit = function() {
            $scope.pending = true;

            $scope.travelData = _.pick($scope.travel, [
                'departure.iata', 'arrival.iata', 'numberOfPassengers'
            ]);

            $scope.formBody = angular.toJson($scope.travelData, 4);
        }

        // departures
        $scope.departures = [];

        $scope.searchDepartures = function(q) {
            travelService.searchPoint(q, function(result) {
                $scope.departures = transformPoints(result);
            });
        };

        // arrivals
        $scope.arrivals = [];

        $scope.searchArrivals = function(q) {
            travelService.searchPoint(q, function(result) {
                $scope.arrivals = transformPoints(result);
            });
        };

        //
        function transformPoint(point, level) {
            var iataStr = ' (' + point.iata + ')',
                short, full;

            if (point._type === 'city') {
                short = point.name + iataStr;
                full = short;
            }

            if (point._type === 'airport') {
                short = (
                    level === 1 ? (_.startsWith(point.name, point.airport_name) ? '' : point.airport_name + ', ') + point.name : point.airport_name
                ) + iataStr;

                full = (level === 1 ? short : (_.startsWith(point.name, point.airport_name) ? '' : point.airport_name + ', ') + point.name + iataStr);
            }

            return _.extend({}, point, {
                _level: level,
                _shortDisplayName: short,
                _fullDisplayName: full,
            });
        }

        /**
         * Flat points
         */
        function transformPoints(result) {
            var points = [];

            _.each(result, function(point) {
                var level = 1;

                // Logic of airport priority
                if (point.city && _.size(point.airports) > 1) {
                    points.push(transformPoint(point.city, level));
                    level++;
                }

                _.each(point.airports, function(airport) {
                    points.push(transformPoint(airport, level));
                });

                // Logic of city priority
                // if (point.city) {
                //     points.push(transformPoint(point.city, level));
                //     level++;
                // }
                //
                // if (!point.city || _.size(point.airports) > 1) {
                //     _.each(point.airports, function(airport) {
                //         points.push(transformPoint(airport, level));
                //     });
                // }
            });

            return points;
        }
    }])
    //
    .directive('appTravelPoint', [function() {
        return {
            restrict: 'A',
            template: templates['travel-point'],
            scope: {
                point: "< appTravelPoint",
                full: '<'
            }
        };
    }])
    //
    .directive('appTravelForm', [function() {
        return {
            restrict: 'A',
            template: templates['travel-form'],
            scope: {
                maxPassengers: "<"
            },
            controller: 'appTravelFormController'
        };
    }]);
//
