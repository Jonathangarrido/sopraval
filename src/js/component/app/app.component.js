// **********************************************************
// archivo component/app
// **********************************************************
'use strict';

appCtrl.$inject = ['setDatos'];
function appCtrl(setDatos) {
  var vm = this;
  vm.animation = [];

  ////////////////////////////////////////////

  vm.$onInit = function () {
    // pepe()
  }

  vm.$onChanges = function () {
    // vm.pepe = setDatos.animate;
  }

}

angular.module('app', [])
  .component('app', {
    templateUrl: './js/component/app/app.html',
    controller: appCtrl
  });