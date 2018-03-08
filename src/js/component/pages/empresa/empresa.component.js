// **********************************************************
// archivo component/pages/empresa
// **********************************************************
'use strict';

empresaCtrl.$inject = [];
function empresaCtrl() {
  var vm = this;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    
  };

}

angular.module('empresa', [])
  .component('empresa', {
    templateUrl: './js/component/common/empresa/empresa.html',
    controller: empresaCtrl,
  });