// **********************************************************
// archivo component/pages/contacto
// **********************************************************
'use strict';

contactoCtrl.$inject = [];
function contactoCtrl() {
  var vm = this;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    
  };

}

angular.module('contacto', [])
  .component('contacto', {
    templateUrl: './js/component/common/contacto/contacto.html',
    controller: contactoCtrl,
  });