// **********************************************************
// archivo component/pages/home
// **********************************************************
'use strict';

homeCtrl.$inject = ['setDatos', '$scope', '$timeout'];
function homeCtrl(setDatos, $scope, $timeout) {
  var vm = this;
  vm.active;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    animate();
  }

  vm.collapse = function () {
    vm.active = !vm.active;
  };

  function animate() {
    $timeout(function () {
      setDatos.setAnimate('slideIn')
      $scope.$apply();
    }, 800);
  }

}

angular.module('home', [])
  .component('home', {
    templateUrl: './js/component/pages/home/home.html',
    controller: homeCtrl
  });