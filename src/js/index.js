// **********************************************************
// archivo index
// **********************************************************
'use strict';

(function () {

  config.$inject = ['$routeProvider', '$locationProvider', 'AnalyticsProvider'];
  function config($routeProvider, $locationProvider, AnalyticsProvider) {
    $routeProvider
      .when('/', {
        template: '<home></home>'
      })
      .when('/productos', {
        template: '<productos></productos>'
      })
      .when('/productos/:categoria', {
        template: '<categoria></categoria>'
      })
      .when('/productos/:categoria/:id', {
        template: '<producto></producto>'
      })
      .when('/recetas', {
        template: '<recetas></recetas>'
      })
      .when('/recetas/:id', {
        template: '<receta></receta>'
      })
      .when('/nuestra-empresa', {
        template: '<empresa></empresa>'
      })
      .when('/uso-y-manipulacion-segura', {
        template: '<manipulacion></manipulacion>'
      })
      .when('/contacto', {
        template: '<contacto></contacto>'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.hashPrefix('');

    // initial configuration
    AnalyticsProvider.setAccount('UA-115170405-1');

    // track all routes/states (or not)
    AnalyticsProvider.trackPages(true);

    // Use analytics.js instead of ga.js
    AnalyticsProvider.useAnalytics(true);

    AnalyticsProvider.trackPrefix('Sopraval');

    // change page event name
    AnalyticsProvider.setPageEvent('$stateChangeSuccess');
  }

  Run.$inject = ['Analytics'];
  function Run(Analytics) {
  }

  angular
    .module('sopraval', [
      'ngRoute',
      'ngAnimate',
      'jsonService',
      'setDatos',
      'app',
      'menu',
      'lista',
      'home',
      'productos',
      'categoria',
      'producto',
      'recetas',
      'receta',
      'fondo',
      'empresa',
      'manipulacion',
      'contacto',
      'angular-google-analytics'
    ])
    .config(config)
    .run(Run);

})();