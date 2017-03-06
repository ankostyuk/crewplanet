'use strict';

/**
 * @author ankostyuk
 */

var _               = require('lodash'),
    angular         = require('angular');

module.exports = angular.module('app.travel.service', [])
    //
    .service('travelService', ['$http', 'i18nService', function($http, i18nService) {
        //
        var pointSearchUrl          = 'https://places.aviasales.ru/match',
            pointSearchLocale       = i18nService.getLang(),
            pointSearchMaxResult    = 10;

        //
        function pointIsCity(point) {
            return !point['city_iata'];
        }

        function pointIsAirport(point) {
            return !!point['airport_name'];
        }

        /**
         * Group by City and sort by order of search result
         */
        function transformSearchPointResult(data) {
            var relevance       = 1,
                groupedByCity   = {},
                result          = [];

            _.each(data, function(point) {
                var cityKey = point['city_iata'] || point['iata'];

                var byCity = groupedByCity[cityKey] || {
                    _relevance: relevance++,
                    city: null,
                    airports: []
                };

                if (pointIsCity(point)) {
                    point._type = 'city';
                    byCity.city = point;
                } else if (pointIsAirport(point)) {
                    point._type = 'airport';
                    byCity.airports.push(point);
                }

                groupedByCity[cityKey] = byCity;
            });

            result = _.sortBy(groupedByCity, function(byCity) {
                return byCity._relevance;
            });

            return result;
        }

        //
        this.searchPoint = function(q, successHandler) {
            if (!q) {
                return false;
            }

            $http.get(pointSearchUrl, {
                params: {
                    locale: pointSearchLocale,
                    max: pointSearchMaxResult,
                    term: q
                }
            }).then(function(response) {
                // console.debug('searchPoint...', q, '->\n', angular.toJson(response.data));
                var result = transformSearchPointResult(response.data);
                successHandler(result);
            });

            return true;
        };
    }]);
//
