// **********************************************************
// archivo component/pages/home
// **********************************************************
'use strict';

homeCtrl.$inject = [];
function homeCtrl() {
  var vm = this;
  init();

  ////////////////////////////////////////////

  function init() {
    
  }

}

angular.module('home', [])
  .component('home', {
    templateUrl: './js/component/pages/home/home.html',
    controller: homeCtrl
  });