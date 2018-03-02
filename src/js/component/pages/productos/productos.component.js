// **********************************************************
// archivo component/pages/productos
// **********************************************************
'use strict';

productosCtrl.$inject = ['setDatos'];
function productosCtrl(setDatos) {
  var vm = this;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    
  }

}

angular.module('productos', [])
  .component('productos', {
    templateUrl: './js/component/pages/productos/productos.html',
    controller: productosCtrl
  });