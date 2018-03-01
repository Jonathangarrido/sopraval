// **********************************************************
// archivo component/common/menu
// **********************************************************
'use strict';

menuCtrl.$inject = [];
function menuCtrl() {
  var vm = this;
  init();

  ////////////////////////////////////////////

  function init() {
    
  }

}

angular.module('menu', [])
  .component('menu', {
    templateUrl: './js/component/common/menu/menu.html',
    controller: menuCtrl
  });