// **********************************************************
// archivo component/common/fondo
// **********************************************************
'use strict';

fondoCtrl.$inject = [];
function fondoCtrl() {
  var vm = this;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    
  };

}

angular.module('fondo', [])
  .component('fondo', {
    templateUrl: './js/component/common/fondo/fondo.html',
    controller: fondoCtrl,
  });