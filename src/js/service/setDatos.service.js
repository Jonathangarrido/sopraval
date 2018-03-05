
// **********************************************************
// archivo service/setDatos
// ********************************************************** 

(function () {
  'use strict';

  setDatos.$inject = ['$location'];
  function setDatos($location) {

    var service = {
      setCategoria: setCategoria,
      setUrl: setUrl,
      animate: [],
      setAnimate: setAnimate,
      listDatos: [],
      listTipo: '',
      setList: setList,
    };

    return service;

    /////////////////////////////////////////

    function setList(setDatos, tipo){
      service.listTipo = tipo;
      service.listDatos = setDatos;
    }

    function setCategoria() {
      var location = $location.path().split('/');
      var urlCategoria = location[2];
      var categoria;
      switch (urlCategoria) {
        case 'jamones-pechugas': categoria = 'Jamones y Pechugas'; break;
        case 'tradicional': categoria = 'Tradicional'; break;
        case 'parrilleros': categoria = 'Parrilleros'; break;
        case 'practicos': categoria = 'Prácticos'; break;
      }
      return categoria;
    }

    function setUrl(url) {
      var data = JSON.parse(url);
      data.splice(-1, 1);
      var str;
      return str = data.join('/')
    }

    function setAnimate(active) {
      var state;
      switch (active){
        case 'fade': state = []; state.fade = true; break; 
        case 'slideIn': state = []; state.slideIn = true; break; 
        default: state = [];
      }
      service.animate = state;
    }

  }

  angular
    .module('setDatos', [])
    .factory('setDatos', setDatos);

})();