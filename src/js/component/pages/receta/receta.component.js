
// **********************************************************
// archivo component/pages/receta
// **********************************************************
'use strict';

recetaCtrl.$inject = ['$location', 'Consultas', 'setDatos'];
function recetaCtrl($location, Consultas, setDatos) {
  var vm = this;
  vm.urlAll = $location.path().split('/');
  vm.url = vm.urlAll[2];
  
  ////////////////////////////////////////////

  vm.$onInit = function () {
    getData();
    animate();
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
    })
  }

}

angular.module('receta', [])
  .component('receta', {
    templateUrl: './js/component/pages/receta/receta.html',
    controller: recetaCtrl
  });