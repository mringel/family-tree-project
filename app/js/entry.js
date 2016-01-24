// require('./plugins/sigma.min.js');
// require('linkurious');
// var dagre = require('dagre');
// require('dagre');
require('angular/angular');
require('leaflet');
require('angular-simple-logger');
require('ui-leaflet');
var angular = window.angular;


var familyTreeApp = angular.module('FamilyTreeApp', ['nemLogging', 'ui-leaflet']);
require('./familytree/familytree')(familyTreeApp);
