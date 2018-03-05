
// **********************************************************
// archivo component/pages/categoria
// **********************************************************
'use strict';

categoriaCtrl.$inject = ['$location', 'Consultas', 'setDatos'];
function categoriaCtrl($location, Consultas, setDatos) {
  var vm = this;
  vm.urlAll = $location.path().split('/');
  vm.url = vm.urlAll[2];
  vm.categorias = [
    {tipo:'tradicional',nombre:'Tradicional'},
    {tipo:'jamones-pechugas',nombre:'Jamones y Pechugas'},
    {tipo:'parrilleros',nombre:'Parrilleros'},
    {tipo:'practicos',nombre:'Prácticos'}
  ];

  ////////////////////////////////////////////

  vm.$onInit = function () {
    titulo();
    fondo();
  }

  function fondo(){
    $('.categoria-fondo').css('background-image','url(../img/fondos/f-'+vm.url+'.jpg)')
  }

  function titulo() {
    vm.categoria = setDatos.setCategoria();
  }
}

angular.module('categoria', [])
  .component('categoria', {
    templateUrl: './js/component/pages/categoria/categoria.html',
    controller: categoriaCtrl
  });