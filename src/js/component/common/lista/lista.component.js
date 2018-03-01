// **********************************************************
// archivo component/common/lista
// **********************************************************
'use strict';

listaCtrl.$inject = ['$window', '$location', 'setDatos'];
function listaCtrl($window, $location, setDatos) {
  var vm = this;
  vm.newDatos;
  vm.newTipo;

  ////////////////////////////////////////////

  this.$onInit = function () {

  }

  this.$onChanges = function () {
    vm.newDatos = setDatos.setArray($window.angular.copy(this.datos));
    vm.newTipo = $window.angular.copy(this.tipo);
    vm.volver = setDatos.setUrl($window.angular.copy(this.url))
  }

}

angular.module('lista', [])
  .component('lista', {
    bindings: {
      datos: '@',
      tipo: '@',
      url: '@',
    },
    templateUrl: './js/component/common/lista/lista.html',
    controller: listaCtrl,

  });