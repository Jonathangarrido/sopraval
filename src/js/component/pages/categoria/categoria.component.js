
// **********************************************************
// archivo component/pages/categoria
// **********************************************************
'use strict';

categoriaCtrl.$inject = ['$location', 'Consultas', 'setDatos', '$timeout', '$scope', 'Analytics'];
function categoriaCtrl($location, Consultas, setDatos, $timeout, $scope, Analytics) {
  var vm = this;
  vm.urlAll = $location.path().split('/');
  vm.url = vm.urlAll[2];
  vm.categorias = [
    { tipo: 'tradicional', nombre: 'Tradicional' },
    { tipo: 'jamones-pechugas', nombre: 'Jamones y Pechugas' },
    { tipo: 'parrilleros', nombre: 'Parrilleros' },
    { tipo: 'practicos', nombre: 'Prácticos' }
  ];

  ////////////////////////////////////////////

  vm.$onInit = function () {
    titulo();
    fondo();
    animate();
    getDatos();
    volver();
    analytics();
    menuActive();
    setDatos.viewHeight();
    $('.lista').removeClass('lista-producto-responsive')
  };

  function analytics() {
    Analytics.trackEvent('page', 'productos', vm.urlAll[2]);
  }

  function volver() {
    $timeout(function () {
      setDatos.setBack(vm.urlAll);
      $scope.$apply();
    }, 100);
  }

  function getDatos() {
    Consultas.getProductos().then(function (response) {
      var data = response.data;
      var datos = data.filter(function (producto) {
        return producto.categoria === vm.urlAll[2];
      });

      $timeout(function () {
        setDatos.setList(datos, 'productos');
        $scope.$apply();
      }, 100);
    });
  }

  function fondo() {
    $('.categoria-fondo').css('background-image', 'url(./img/fondos/f-' + vm.url + '.jpg)');
  }

  function titulo() {
    vm.categoria = setDatos.setCategoria();
  }

  function animate() {
    $('.categoria-fondo').addClass('in');
    $timeout(function () {
      setDatos.setAnimate('fade');
      $scope.$apply();
    }, 800);
  }

  function menuActive() {
    $timeout(function () {
      setDatos.setVisible(true);
      $scope.$apply();
    }, 100);
  }
}

angular.module('categoria', [])
  .component('categoria', {
    templateUrl: './js/component/pages/categoria/categoria.html',
    controller: categoriaCtrl
  });