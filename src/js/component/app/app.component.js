// **********************************************************
// archivo component/app
// **********************************************************
'use strict';

appCtrl.$inject = ['setDatos', '$scope'];
function appCtrl(setDatos, $scope) {
  var vm = this;
  vm.animation = [];

  ////////////////////////////////////////////

  vm.$onInit = function () {
    watchAnimate();

    angular.element(document).ready(function () {
      $('.loading').addClass('loading-out');
    });

  };

  function watchAnimate() {
    $scope.$watch(function () {
      return setDatos.animate;
    }, function (newVal, oldVal) {
      vm.animation = newVal;
    });
  }

}

angular.module('app', [])
  .component('app', {
    templateUrl: './js/component/app/app.html',
    controller: appCtrl
  });