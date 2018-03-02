// **********************************************************
// archivo component/pages/productos
// **********************************************************
'use strict';

productosCtrl.$inject = ['setDatos', '$scope', '$timeout'];
function productosCtrl(setDatos, $scope, $timeout) {
  var vm = this;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    animate();
  }

  function animate() {
    $timeout(function () {
      setDatos.setAnimate()
      $scope.$apply();
    }, 800);
  }

}

angular.module('productos', [])
  .component('productos', {
    templateUrl: './js/component/pages/productos/productos.html',
    controller: productosCtrl
  });