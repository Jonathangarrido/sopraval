// **********************************************************
// archivo component/pages/productos
// **********************************************************
'use strict';

productosCtrl.$inject = [];
function productosCtrl() {
  var vm = this;
  init();

  ////////////////////////////////////////////

  function init() {
    
  }

}

angular.module('productos', [])
  .component('productos', {
    templateUrl: './js/component/pages/productos/productos.html',
    controller: productosCtrl
  });