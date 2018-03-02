// **********************************************************
// archivo component/pages/home
// **********************************************************
'use strict';

homeCtrl.$inject = ['setDatos', '$rootScope'];
function homeCtrl(setDatos, $rootScope) {
  var vm = this;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    animate();
  }

  function animate(){
    
  }

}

angular.module('home', [])
  .component('home', {
    templateUrl: './js/component/pages/home/home.html',
    controller: homeCtrl
  });