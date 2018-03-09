
// **********************************************************
// archivo component/pages/receta
// **********************************************************
'use strict';

recetaCtrl.$inject = ['$location', 'Consultas', 'setDatos', '$timeout', '$scope', 'Analytics'];
function recetaCtrl($location, Consultas, setDatos, $timeout, $scope, Analytics) {
  var vm = this;
  vm.urlAll = $location.path().split('/');
  vm.url = vm.urlAll[2];
  vm.producto;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    getData();
    volver();
    analytics();
    menuActive();
  };

  function analytics() {
    Analytics.trackEvent('page', 'recetas', vm.url);
  }

  function volver() {
    $timeout(function () {
      setDatos.setBack(vm.urlAll);
      $scope.$apply();
    }, 100);
  }

  function getData() {
    Consultas.getRecetas().then(function (response) {
      var data = response.data;
      var dato = data.filter(function (producto) {
        return producto.id === vm.url;
      });
      vm.producto = dato[0];

      var str2 = vm.producto.preparacion;
      var filtroIngredientes = str2.split('--');
      vm.producto.preparacion = filtroIngredientes;

      $timeout(function () {
        setDatos.setList(data, 'recetas');
        $scope.$apply();
      }, 100);
    });
  }

  function menuActive() {
    $timeout(function () {
      setDatos.setVisible(true);
      $scope.$apply();
    }, 100);
  }

}

angular.module('receta', [])
  .component('receta', {
    templateUrl: './js/component/pages/receta/receta.html',
    controller: recetaCtrl
  });