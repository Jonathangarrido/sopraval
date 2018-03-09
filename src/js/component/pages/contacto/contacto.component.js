// **********************************************************
// archivo component/pages/contacto
// **********************************************************
'use strict';

contactoCtrl.$inject = ['$timeout', '$scope', 'setDatos', 'Analytics'];
function contactoCtrl($timeout, $scope, setDatos, Analytics) {
  var vm = this;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    animate();
    analytics();
    list();
  };

  function analytics() {
    Analytics.trackEvent('page', 'contacto');
  }

  function animate() {
    $timeout(function () {
      setDatos.setAnimate('fade');
      $scope.$apply();
    }, 800);
  }

  function list(){
    $timeout(function () {
      setDatos.setList([], '');
      $scope.$apply();
    }, 100);
  }

}

angular.module('contacto', [])
  .component('contacto', {
    templateUrl: './js/component/pages/contacto/contacto.html',
    controller: contactoCtrl,
  });