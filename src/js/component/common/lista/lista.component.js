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
  vm.tipoClass;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    watchDatos();
  };

  function watchDatos() {
    $scope.$watch(function () {
      return setDatos.listDatos;
    }, function (newVal, oldVal) {
      vm.items = newVal;

      newVal.length ? vm.openList = true : vm.openList = false;
    });

    $scope.$watch(function () {
      return setDatos.listTipo;
    }, function (newVal, oldVal) {
      vm.newTipo = newVal;
      vm.newTipo === 'productos' ? vm.tipoClass = false : vm.tipoClass = true;
    });

    $scope.$watch(function () {
      return setDatos.url;
    }, function (newVal, oldVal) {
      vm.volver = newVal;
    });
  }

  vm.back = function () {
    var url = setDatos.setUrl(vm.volver);
    $timeout(function () {
      setDatos.setAnimate('fade');
      $scope.$apply();
      $location.path(url);
    }, 100);
  };

}

angular.module('lista', [])
  .component('lista', {
    templateUrl: './js/component/common/lista/lista.html',
    controller: listaCtrl,
  });