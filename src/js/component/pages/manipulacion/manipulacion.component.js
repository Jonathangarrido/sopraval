// **********************************************************
// archivo component/pages/manipulacion
// **********************************************************
'use strict';

manipulacionCtrl.$inject = ['$timeout', '$scope', 'setDatos', 'Analytics'];
function manipulacionCtrl($timeout, $scope, setDatos, Analytics) {
  var vm = this;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    animate();
    analytics();
  };

  function analytics() {
    Analytics.trackEvent('page', 'más información', 'uso y manipulación segura');
  }

  function animate() {
    $timeout(function () {
      setDatos.setAnimate('fade');
      $scope.$apply();
    }, 800);
  }
}

angular.module('manipulacion', [])
  .component('manipulacion', {
    templateUrl: './js/component/pages/manipulacion/manipulacion.html',
    controller: manipulacionCtrl,
  });