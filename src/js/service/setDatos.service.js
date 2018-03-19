
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
      setBack: setBack,
      url: '',
      visible: true,
      setVisible: setVisible,
      viewHeight: viewHeight
    };

    return service;

    /////////////////////////////////////////

    function setVisible(estado) {
      service.visible = estado;
    }

    function setBack(url) {
      service.url = url;
    }

    function setList(setDatos, tipo) {
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
      var data = url;
      data.splice(-1, 1);
      var str;
      return str = data.join('/');
    }

    function setAnimate(active) {
      var state;
      switch (active) {
        case 'fade': state = []; state.fade = true; break;
        case 'slideIn': state = []; state.slideIn = true; break;
        default: state = [];
      }
      service.animate = state;
    }

    function viewHeight(){
      var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      $('.view-height').css('min-height', h+'px');
    }

  }

  angular
    .module('setDatos', [])
    .factory('setDatos', setDatos);

})();