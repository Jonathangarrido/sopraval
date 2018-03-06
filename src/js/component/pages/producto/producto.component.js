// **********************************************************
// archivo component/pages/producto
// **********************************************************
'use strict';

productoCtrl.$inject = ['Consultas', '$location', 'setDatos', '$scope', '$timeout', 'Analytics'];
function productoCtrl(Consultas, $location, setDatos, $scope, $timeout, Analytics) {
  var vm = this;
  vm.urlAll = $location.path().split('/');
  vm.urlCategoria = vm.urlAll[2];
  vm.urlProducto = vm.urlAll[3];

  ////////////////////////////////////////////

  vm.$onInit = function () {
    getData();
    animate();
    fondo();
    volver();
    analytics();
  };

  function analytics() {
    Analytics.trackEvent('page', 'productos', vm.urlCategoria, vm.urlProducto);
  }

  function volver() {
    $timeout(function () {
      setDatos.setBack(vm.urlAll);
      $scope.$apply();
    }, 100);
  }

  function animate() {
    $timeout(function () {
      setDatos.setAnimate();
      $scope.$apply();
    }, 800);
  }

  function getData() {
    Consultas.getProductos().then(function (response) {
      var data = response.data;
      var dato = data.filter(function (producto) {
        return producto.id === vm.urlProducto;
      });
      vm.producto = dato[0];
      imagen();

      var datos = data.filter(function (producto) {
        return producto.categoria === vm.urlAll[2];
      });
      $timeout(function () {
        setDatos.setList(datos, 'productos');
        $scope.$apply();
      }, 100);
    });
  }

  function fondo() {
    $('.producto-fondo').css('background-image', 'url(./img/fondos/f-' + vm.urlCategoria + '.jpg)');
  }

  function imagen() {
    $('.producto-titulo-fondo').css('background-image', 'url(./img/productos/' + vm.producto.categoria + '/' + vm.producto.imagen + '.jpg)');
  }

}

angular.module('producto', [])
  .component('producto', {
    templateUrl: './js/component/pages/producto/producto.html',
    controller: productoCtrl,

  });