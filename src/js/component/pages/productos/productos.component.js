// **********************************************************
// archivo component/pages/productos
// **********************************************************
'use strict';

productosCtrl.$inject = ['setDatos', '$scope', '$timeout'];
function productosCtrl(setDatos, $scope, $timeout) {
  var vm = this;
  vm.categorias = [
    {tipo:'tradicional',nombre:'Tradicional'},
    {tipo:'jamones-pechugas',nombre:'Jamones y Pechugas'},
    {tipo:'parrilleros',nombre:'Parrilleros'},
    {tipo:'practicos',nombre:'Prácticos'}
  ];
  vm.background = []

  ////////////////////////////////////////////

  vm.$onInit = function () {
    animate();
  }

  vm.backgroundOver = function(categoria){
    vm.background = []
    switch (categoria) {
      case 'jamones-pechugas': vm.background.jamonesPechugas = true; break;
      case 'tradicional': vm.background.tradicional = true; break;
      case 'parrilleros': vm.background.parrilleros = true; break;
      case 'practicos': vm.background.practicos = true; break;
    }
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