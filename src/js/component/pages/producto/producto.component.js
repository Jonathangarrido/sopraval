// **********************************************************
// archivo component/pages/producto
// **********************************************************
'use strict';

productoCtrl.$inject = ['Consultas', '$location', 'setDatos'];
function productoCtrl(Consultas, $location, setDatos) {
  var vm = this;
  vm.urlAll = $location.path().split('/');
  vm.urlCategoria = vm.urlAll[2];
  vm.urlProducto = vm.urlAll[3];

  ////////////////////////////////////////////

  this.$onInit = function () {
    getData();
    titulo();
  }

  function getData() {
    Consultas.getProductos().then(function (response) {
      var data = response.data;

      // obtengo todos los productos con la categoria
      var datos = data.filter(function (producto) {
        return producto.categoria === vm.urlCategoria;
      });
      vm.productos = datos;

      // obtengo el producto
      var dato = data.filter(function (producto) {
        return producto.id === vm.urlProducto;
      });
      vm.producto = dato[0];
    })
  }

  function titulo() {
    vm.categoria = setDatos.setCategoria();
  }
}

angular.module('producto', [])
  .component('producto', {
    templateUrl: './js/component/pages/producto/producto.html',
    controller: productoCtrl,

  });