
// **********************************************************
// archivo component/pages/recetas
// **********************************************************
'use strict';

recetasCtrl.$inject = ['$location', 'Consultas', 'setDatos', '$timeout', '$scope', 'Analytics'];
function recetasCtrl($location, Consultas, setDatos, $timeout, $scope, Analytics) {
  var vm = this;
  vm.urlAll = $location.path().split('/');
  vm.url = vm.urlAll[2];

  ////////////////////////////////////////////

  vm.$onInit = function () {
    getDatos();
    volver();
    menuActive();
    animate();
    analytics();
    setDatos.viewHeight();
    $('.lista').removeClass('lista-producto-responsive')
  };

  function analytics() {
    Analytics.trackEvent('page', 'recetas');
  }

  function animate() {
    $timeout(function () {
      setDatos.setAnimate('fade');
      $scope.$apply();
    }, 800);
  }

  function volver() {
    $timeout(function () {
      setDatos.setBack(vm.urlAll);
      $scope.$apply();
    }, 100);
  }

  function getDatos() {
    Consultas.getRecetas().then(function (response) {
      var data = response.data;
      $timeout(function () {
        setDatos.setList(data, 'recetas');
        $scope.$apply();
      }, 100);
    });
  }

  function menuActive() {
    $timeout(function () {
      setDatos.setVisible(true);
      $scope.$apply();
    }, 100);
  }
}

angular.module('recetas', [])
  .component('recetas', {
    templateUrl: './js/component/pages/recetas/recetas.html',
    controller: recetasCtrl
  });