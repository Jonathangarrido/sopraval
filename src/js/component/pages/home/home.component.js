// **********************************************************
// archivo component/pages/home
// **********************************************************
'use strict';

homeCtrl.$inject = ['setDatos', '$scope', '$timeout', 'Analytics'];
function homeCtrl(setDatos, $scope, $timeout, Analytics) {
  var vm = this;
  vm.active;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    animate();
    cleanList();
    analytics();
  };

  function animate() {
    $timeout(function () {
      setDatos.setAnimate('slideIn');
      $scope.$apply();
    }, 800);
  }

  function cleanList() {
    $timeout(function () {
      setDatos.setList([], '');
      $scope.$apply();
    }, 100);
  }

  function analytics() {
    Analytics.trackEvent('page', 'home');
  }

  vm.collapse = function () {
    vm.active = !vm.active;
  };

}

angular.module('home', [])
  .component('home', {
    templateUrl: './js/component/pages/home/home.html',
    controller: homeCtrl
  });