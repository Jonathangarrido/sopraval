// **********************************************************
// archivo component/pages/empresa
// **********************************************************
'use strict';

empresaCtrl.$inject = ['$timeout', '$scope', 'setDatos', 'Analytics'];
function empresaCtrl($timeout, $scope, setDatos, Analytics) {
  var vm = this;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    animate();
    analytics();
  };

  function analytics() {
    Analytics.trackEvent('page', 'más información', 'nuestra empresa');
  }

  function animate() {
    $timeout(function () {
      setDatos.setAnimate('fade');
      $scope.$apply();
    }, 800);
  }
}

angular.module('empresa', [])
  .component('empresa', {
    templateUrl: './js/component/pages/empresa/empresa.html',
    controller: empresaCtrl,
  });