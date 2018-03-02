// **********************************************************
// archivo component/common/menu
// **********************************************************
'use strict';

menuCtrl.$inject = ['setDatos', '$location', '$scope', '$timeout'];
function menuCtrl(setDatos, $location, $scope ,$timeout) {
  var vm = this;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    
  }

  vm.back = function () {
    setDatos.setAnimate('fade');
    $timeout(redireccionar,100)
  }

  function redireccionar(){
    $location.path("/");
  }

}

angular.module('menu', [])
  .component('menu', {
    templateUrl: './js/component/common/menu/menu.html',
    controller: menuCtrl
  });