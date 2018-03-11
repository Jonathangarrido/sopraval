// **********************************************************
// archivo component/pages/contacto
// **********************************************************
'use strict';

contactoCtrl.$inject = ['$timeout', '$scope', 'setDatos', 'Analytics', '$http'];
function contactoCtrl($timeout, $scope, setDatos, Analytics, $http) {
  var vm = this;
  vm.user = {};
  vm.mensaje = '';
  vm.estado = '';

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

  vm.submitForm = function () {
    $http({
      method  : 'POST',
      url     : './php/formulario.php',
      data    : vm.user, //forms user object
      headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
    })
      .then(function (success){
        console.log(success.data)
        if(success.data==='bien'){
          vm.mensaje = 'Mensaje enviado correctamente.';
          vm.estado = 'icon-check';
          // Analytics.trackEvent('correo','enviado');
          $timeout(function(){
            vm.user = {};
            vm.mensaje = '';
            vm.estado = '';
          },3000)
        }else{
          vm.mensaje = 'Error al enviar. Intentelo nuevamente.';
          
        }
      },function (error){
        vm.mensaje = 'Error en la conexión.';
      });
  };

}

angular.module('contacto', [])
  .component('contacto', {
    templateUrl: './js/component/pages/contacto/contacto.html',
    controller: contactoCtrl,
  });