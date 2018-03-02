// **********************************************************
// archivo component/common/lista
// **********************************************************
'use strict';

listaCtrl.$inject = ['$window', '$location', 'setDatos', 'Consultas'];
function listaCtrl($window, $location, setDatos, Consultas) {
  var vm = this;
  vm.newDatos;
  vm.newTipo;
  vm.items;
  vm.urlAll = $location.path().split('/');

  ////////////////////////////////////////////

  vm.$onInit = function () {
    getData();
  }

  vm.$onChanges = function () {
    vm.newTipo = $window.angular.copy(this.tipo);
    vm.volver = setDatos.setUrl($window.angular.copy(this.url))
  }

  function getData() {
    if(vm.urlAll[1] === 'productos'){
      Consultas.getProductos().then(function (response) {
        var data = response.data;
        var datos = data.filter(function (producto) {
          return producto.categoria === vm.urlAll[2];
        });
        vm.items = datos;
      })
    }else if (vm.urlAll[1] === 'recetas'){

    }

  }

}

angular.module('lista', [])
  .component('lista', {
    bindings: {
      tipo: '@',
      url: '@',
    },
    templateUrl: './js/component/common/lista/lista.html',
    controller: listaCtrl,

  });