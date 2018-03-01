// **********************************************************
// archivo index
// **********************************************************
'use strict';

(function () {

  config.$inject = ['$routeProvider','$locationProvider'];
  function config($routeProvider, $locationProvider) {
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
      // .when('/recetas', {
      //   template: '<recetas></recetas>'
      // })
      // .when('/receta/:id', {
      //   template: '<receta></receta>'
      // })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.hashPrefix('');
  }

  Run.$inject = [];
  function Run() {
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
      // 'recetas',
      // 'receta',
      // 'common',
      // 'separacion'
    ])
    .config(config);

})();