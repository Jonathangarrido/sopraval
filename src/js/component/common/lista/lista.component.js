// **********************************************************
// archivo component/common/lista
// **********************************************************
'use strict';

listaCtrl.$inject = ['$window', '$location', 'setDatos', 'Consultas', '$scope', '$timeout'];
function listaCtrl($window, $location, setDatos, Consultas, $scope, $timeout) {
  var vm = this;
  vm.newDatos;
  vm.newTipo;
  vm.items;
  vm.urlAll = $location.path().split('/');

  ////////////////////////////////////////////

  vm.$onInit = function () {
    watchDatos()
  }

  vm.$onChanges = function () {
    watchDatos()
    // vm.newTipo = $window.angular.copy(this.tipo);
    // vm.volver = setDatos.setUrl($window.angular.copy(this.url))
  }

  function watchDatos(){
    $scope.$watch(function(){
      return setDatos.listDatos;
    }, function(newVal, oldVal){
      vm.items = newVal;
    })

    $scope.$watch(function(){
      return setDatos.listTipo;
    }, function(newVal, oldVal){
      vm.newTipo = newVal;
    })
  }

  function getData() {
    // if (vm.urlAll[1] === 'productos') {
    //   Consultas.getProductos().then(function (response) {
    //     var data = response.data;
    //     var datos = data.filter(function (producto) {
    //       return producto.categoria === vm.urlAll[2];
    //     });
    //     vm.items = datos;
    //   })
    // } else if (vm.urlAll[1] === 'recetas') {
    //   Consultas.getRecetas().then(function (response) {
    //     var data = response.data;
    //     vm.items = data;
    //   })
    // }
  }

  vm.back = function () {
    $timeout(function () {
      setDatos.setAnimate('fade')
      $scope.$apply();
      $location.path(vm.volver);
    }, 100);
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