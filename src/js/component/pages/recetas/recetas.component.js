
// **********************************************************
// archivo component/pages/recetas
// **********************************************************
'use strict';

recetasCtrl.$inject = ['$location', 'Consultas', 'setDatos', '$timeout', '$scope'];
function recetasCtrl($location, Consultas, setDatos, $timeout, $scope) {
  var vm = this;
  vm.urlAll = $location.path().split('/');
  vm.url = vm.urlAll[2];
  
  ////////////////////////////////////////////

  vm.$onInit = function () {
    getDatos();
  }
  function getDatos(){
    Consultas.getRecetas().then(function (response) {
      var data = response.data;
      $timeout(function () {
        setDatos.setList(data,'recetas');
        $scope.$apply();
      }, 100);
    })
  }
}

angular.module('recetas', [])
  .component('recetas', {
    templateUrl: './js/component/pages/recetas/recetas.html',
    controller: recetasCtrl
  });