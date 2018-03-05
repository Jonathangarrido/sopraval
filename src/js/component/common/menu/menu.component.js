// **********************************************************
// archivo component/common/menu
// **********************************************************
'use strict';

menuCtrl.$inject = ['setDatos', '$location', '$scope', '$timeout'];
function menuCtrl(setDatos, $location, $scope ,$timeout) {
  var vm = this;
  vm.toggleFullscreen;
  vm.toggleFullscreenActive;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    vm.clickMenuFullscreen()
  }

  vm.back = function () {
    
    setDatos.setAnimate('fade');
    $timeout(redireccionar,100)
    $timeout(function(){
      vm.toggleFullscreen = false;
      vm.toggleFullscreenActive = false;
    },500)
  }

  function redireccionar(){
    $location.path("/");
  }

  vm.menuFullscreen = function () {
    vm.toggleFullscreen = !vm.toggleFullscreen;
    vm.toggleFullscreenActive = vm.toggleFullscreen;
  }

  vm.clickMenuFullscreen = function () {
    $('.menu-modal a').click(function(){
      vm.toggleFullscreen = false;
      vm.toggleFullscreenActive = false;
    })
  }

}

angular.module('menu', [])
  .component('menu', {
    templateUrl: './js/component/common/menu/menu.html',
    controller: menuCtrl
  });