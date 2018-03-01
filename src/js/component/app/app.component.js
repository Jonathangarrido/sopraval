// **********************************************************
// archivo component/app
// **********************************************************
'use strict';

appCtrl.$inject = ['Consultas'];
function appCtrl(Consultas) {
  var vm = this;
  init();

  ////////////////////////////////////////////

  function init() {
    
  }

}

angular.module('app', [])
  .component('app', {
    templateUrl: './js/component/app/app.html',
    controller: appCtrl
  });