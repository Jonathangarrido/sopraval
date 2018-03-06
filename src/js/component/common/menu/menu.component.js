// **********************************************************
// archivo component/common/menu
// **********************************************************
'use strict';

menuCtrl.$inject = ['setDatos', '$location', '$scope', '$timeout'];
function menuCtrl(setDatos, $location, $scope, $timeout) {
  var vm = this;
  vm.toggleFullscreen;
  vm.toggleFullscreenActive;
  vm.visible;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    vm.clickMenuFullscreen();
    watchDatos();
    menuActive();
  };

  vm.back = function () {

    setDatos.setAnimate('fade');
    $timeout(redireccionar, 100);
    $timeout(menuActive, 100);
    $timeout(function () {
      vm.toggleFullscreen = false;
      vm.toggleFullscreenActive = false;
    }, 500);
  };

  function redireccionar() {
    $location.path('/');
  }

  vm.menuFullscreen = function () {
    vm.toggleFullscreen = !vm.toggleFullscreen;
    vm.toggleFullscreenActive = vm.toggleFullscreen;
  };

  vm.clickMenuFullscreen = function () {
    $('.menu-modal a').click(function () {
      vm.toggleFullscreen = false;
      vm.toggleFullscreenActive = false;
    });
  };

  function watchDatos() {
    $scope.$watch(function () {
      return setDatos.visible;
    }, function (newVal, oldVal) {
      vm.visible = newVal;
    });
  }

  function menuActive() {
    $timeout(function () {
      setDatos.setVisible(false);
      $scope.$apply();
    }, 100);
  }

}

angular.module('menu', [])
  .component('menu', {
    templateUrl: './js/component/common/menu/menu.html',
    controller: menuCtrl
  });