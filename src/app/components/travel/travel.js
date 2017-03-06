'use strict';

/**
 * @author ankostyuk
 */

var _       = require('lodash'),
    angular = require('angular');

var ngModules = [
    require('./ui/travel-ui'),
    require('./travel-service')
];

module.exports = angular.module('app.travel', _.map(ngModules, 'name'));
