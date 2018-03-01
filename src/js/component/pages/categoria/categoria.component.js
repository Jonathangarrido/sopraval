
// **********************************************************
// archivo component/pages/categoria
// **********************************************************
'use strict';

categoriaCtrl.$inject = ['$location', 'Consultas', 'setDatos'];
function categoriaCtrl($location, Consultas, setDatos) {
  var vm = this;
  vm.urlAll = $location.path().split('/');
  vm.url = vm.urlAll[2];

  ////////////////////////////////////////////

  vm.$onInit = function () {
    getData();
    titulo();
  }

  function getData() {
    Consultas.getProductos().then(function (response) {
      var data = response.data;
      var datos = data.filter(function (producto) {
        return producto.categoria === vm.url;
      });
      vm.productos = datos;
    })
  }

  function titulo() {
    vm.categoria = setDatos.setCategoria();
  }
}

angular.module('categoria', [])
  .component('categoria', {
    templateUrl: './js/component/pages/categoria/categoria.html',
    controller: categoriaCtrl
  });