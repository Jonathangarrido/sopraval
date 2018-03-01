
// **********************************************************
// archivo service/json.service
// ********************************************************** 

(function () {
  'use strict';

  Consultas.$inject = ['$http'];
  function Consultas($http) {

    var service = {
      getProductos: getProductos,
      getRecetas: getRecetas,
    };

    return service;

    /////////////////////////////////////////

    function getProductos() {
      return $http.get('./js/productos.json');
    }

    function getRecetas() {
      return $http.get('./js/recetas.json');
    }

  }

  angular
    .module('jsonService', [])
    .factory('Consultas', Consultas);

})();