// **********************************************************
// archivo index
// **********************************************************
'use strict';

(function () {

  config.$inject = ['$routeProvider','$locationProvider'];
  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        template: '<home></home>'
      })
      .when('/productos', {
        template: '<productos></productos>'
      })
      .when('/productos/:categoria', {
        template: '<categoria></categoria>'
      })
      .when('/productos/:categoria/:id', {
        template: '<producto></producto>'
      })
      .when('/recetas', {
        template: '<recetas></recetas>'
      })
      .when('/recetas/:id', {
        template: '<receta></receta>'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.hashPrefix('');
  }

  Run.$inject = [];
  function Run() {
  }

  angular
    .module('sopraval', [
      'ngRoute',
      'ngAnimate',
      'jsonService',
      'setDatos',
      'app',
      'menu',
      'lista',
      'home',
      'productos',
      'categoria',
      'producto',
      'recetas',
      'receta',
      // 'common',
      // 'separacion'
    ])
    .config(config);

})();
// **********************************************************
// archivo component/app
// **********************************************************
'use strict';

appCtrl.$inject = ['setDatos' ,'$scope'];
function appCtrl(setDatos, $scope) {
  var vm = this;
  vm.animation = [];

  ////////////////////////////////////////////

  vm.$onInit = function () {
    watchAnimate();
  }

  function watchAnimate(){
    $scope.$watch(function(){
      return setDatos.animate;
    }, function(newVal, oldVal){
      vm.animation = newVal;
    })
  }

}

angular.module('app', [])
  .component('app', {
    templateUrl: './js/component/app/app.html',
    controller: appCtrl
  });

// **********************************************************
// archivo component/pages/categoria
// **********************************************************
'use strict';

categoriaCtrl.$inject = ['$location', 'Consultas', 'setDatos', '$timeout', '$scope'];
function categoriaCtrl($location, Consultas, setDatos, $timeout, $scope) {
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
    animate();
    getDatos();
  }
  function getDatos(){
    Consultas.getProductos().then(function (response) {
      var data = response.data;
      var datos = data.filter(function (producto) {
        return producto.categoria === vm.urlAll[2];
      });
      // setDatos.setList(datos,'productos');

      $timeout(function () {
        setDatos.setList(datos,'productos');
        $scope.$apply();
      }, 100);
    })
  }

  function fondo(){
    $('.categoria-fondo').css('background-image','url(../img/fondos/f-'+vm.url+'.jpg)')
  }

  function titulo() {
    vm.categoria = setDatos.setCategoria();
  }

  function animate() {
    $timeout(function () {
      setDatos.setAnimate('fade')
      $scope.$apply();
    }, 800);
  }
}

angular.module('categoria', [])
  .component('categoria', {
    templateUrl: './js/component/pages/categoria/categoria.html',
    controller: categoriaCtrl
  });
// **********************************************************
// archivo component/pages/home
// **********************************************************
'use strict';

homeCtrl.$inject = ['setDatos', '$scope', '$timeout'];
function homeCtrl(setDatos, $scope, $timeout) {
  var vm = this;
  vm.active;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    animate();
  }

  vm.collapse = function () {
    vm.active = !vm.active;
  };

  function animate() {
    $timeout(function () {
      setDatos.setAnimate('slideIn')
      $scope.$apply();
    }, 800);
  }

}

angular.module('home', [])
  .component('home', {
    templateUrl: './js/component/pages/home/home.html',
    controller: homeCtrl
  });
// **********************************************************
// archivo component/pages/producto
// **********************************************************
'use strict';

productoCtrl.$inject = ['Consultas', '$location', 'setDatos', '$scope', '$timeout'];
function productoCtrl(Consultas, $location, setDatos, $scope, $timeout) {
  var vm = this;
  vm.urlAll = $location.path().split('/');
  vm.urlCategoria = vm.urlAll[2];
  vm.urlProducto = vm.urlAll[3];

  ////////////////////////////////////////////

  vm.$onInit = function () {
    getData();
    animate();
    fondo();
    
  }

  function animate() {
    $timeout(function () {
      setDatos.setAnimate()
      $scope.$apply();
    }, 800);
  }

  function getData() {
    Consultas.getProductos().then(function (response) {
      var data = response.data;
      var dato = data.filter(function (producto) {
        return producto.id === vm.urlProducto;
      });
      vm.producto = dato[0];
      imagen();
    })
  }

  function fondo(){
    $('.producto-fondo').css('background-image','url(../img/fondos/f-'+vm.urlCategoria+'.jpg)')
  }

  function imagen(){
    $('.producto-titulo-fondo').css('background-image','url(../img/productos/'+vm.producto.categoria+'/'+vm.producto.imagen+'.jpg)')
  }

}

angular.module('producto', [])
  .component('producto', {
    templateUrl: './js/component/pages/producto/producto.html',
    controller: productoCtrl,

  });
// **********************************************************
// archivo component/pages/productos
// **********************************************************
'use strict';

productosCtrl.$inject = ['setDatos', '$scope', '$timeout'];
function productosCtrl(setDatos, $scope, $timeout) {
  var vm = this;
  vm.categorias = [
    {tipo:'tradicional',nombre:'Tradicional'},
    {tipo:'jamones-pechugas',nombre:'Jamones y Pechugas'},
    {tipo:'parrilleros',nombre:'Parrilleros'},
    {tipo:'practicos',nombre:'Prácticos'}
  ];
  vm.background = []

  ////////////////////////////////////////////

  vm.$onInit = function () {
    animate();
  }

  vm.backgroundOver = function(categoria){
    vm.background = []
    switch (categoria) {
      case 'jamones-pechugas': vm.background.jamonesPechugas = true; break;
      case 'tradicional': vm.background.tradicional = true; break;
      case 'parrilleros': vm.background.parrilleros = true; break;
      case 'practicos': vm.background.practicos = true; break;
    }
  }

  function animate() {
    $timeout(function () {
      setDatos.setAnimate()
      $scope.$apply();
    }, 800);
  }

}

angular.module('productos', [])
  .component('productos', {
    templateUrl: './js/component/pages/productos/productos.html',
    controller: productosCtrl
  });

// **********************************************************
// archivo component/pages/receta
// **********************************************************
'use strict';

recetaCtrl.$inject = ['$location', 'Consultas', 'setDatos'];
function recetaCtrl($location, Consultas, setDatos) {
  var vm = this;
  vm.urlAll = $location.path().split('/');
  vm.url = vm.urlAll[2];
  
  ////////////////////////////////////////////

  vm.$onInit = function () {
    getData();
    animate();
  }

  function getData() {
    Consultas.getRecetas().then(function (response) {
      var data = response.data;
      var dato = data.filter(function (producto) {
        return producto.id === vm.url;
      });
      vm.producto = dato[0];

      var str2 = vm.producto.preparacion;
      var filtroIngredientes = str2.split('--');
      vm.producto.preparacion = filtroIngredientes;
    })
  }

}

angular.module('receta', [])
  .component('receta', {
    templateUrl: './js/component/pages/receta/receta.html',
    controller: recetaCtrl
  });

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
// **********************************************************
// archivo component/common/lista
// **********************************************************
'use strict';

listaCtrl.$inject = ['$window', '$location', 'setDatos', 'Consultas', '$scope', '$timeout'];
function listaCtrl($window, $location, setDatos, Consultas, $scope, $timeout) {
  var vm = this;
  vm.newDatos;
  vm.newTipo;
  vm.items;
  vm.urlAll = $location.path().split('/');

  ////////////////////////////////////////////

  vm.$onInit = function () {
    watchDatos()
  }

  vm.$onChanges = function () {
    watchDatos()
    // vm.newTipo = $window.angular.copy(this.tipo);
    // vm.volver = setDatos.setUrl($window.angular.copy(this.url))
  }

  function watchDatos(){
    $scope.$watch(function(){
      return setDatos.listDatos;
    }, function(newVal, oldVal){
      vm.items = newVal;
    })

    $scope.$watch(function(){
      return setDatos.listTipo;
    }, function(newVal, oldVal){
      vm.newTipo = newVal;
    })
  }

  function getData() {
    // if (vm.urlAll[1] === 'productos') {
    //   Consultas.getProductos().then(function (response) {
    //     var data = response.data;
    //     var datos = data.filter(function (producto) {
    //       return producto.categoria === vm.urlAll[2];
    //     });
    //     vm.items = datos;
    //   })
    // } else if (vm.urlAll[1] === 'recetas') {
    //   Consultas.getRecetas().then(function (response) {
    //     var data = response.data;
    //     vm.items = data;
    //   })
    // }
  }

  vm.back = function () {
    $timeout(function () {
      setDatos.setAnimate('fade')
      $scope.$apply();
      $location.path(vm.volver);
    }, 100);
  }


}

angular.module('lista', [])
  .component('lista', {
    bindings: {
      tipo: '@',
      url: '@',
    },
    templateUrl: './js/component/common/lista/lista.html',
    controller: listaCtrl,

  });
// **********************************************************
// archivo component/common/menu
// **********************************************************
'use strict';

menuCtrl.$inject = ['setDatos', '$location', '$scope', '$timeout'];
function menuCtrl(setDatos, $location, $scope ,$timeout) {
  var vm = this;
  vm.toggleFullscreen;
  vm.toggleFullscreenActive;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    vm.clickMenuFullscreen()
  }

  vm.back = function () {
    
    setDatos.setAnimate('fade');
    $timeout(redireccionar,100)
    $timeout(function(){
      vm.toggleFullscreen = false;
      vm.toggleFullscreenActive = false;
    },500)
  }

  function redireccionar(){
    $location.path("/");
  }

  vm.menuFullscreen = function () {
    vm.toggleFullscreen = !vm.toggleFullscreen;
    vm.toggleFullscreenActive = vm.toggleFullscreen;
  }

  vm.clickMenuFullscreen = function () {
    $('.menu-modal a').click(function(){
      vm.toggleFullscreen = false;
      vm.toggleFullscreenActive = false;
    })
  }

}

angular.module('menu', [])
  .component('menu', {
    templateUrl: './js/component/common/menu/menu.html',
    controller: menuCtrl
  });

// **********************************************************
// archivo service/json.service
// ********************************************************** 

(function () {
  'use strict';

  Consultas.$inject = ['$http'];
  function Consultas($http) {

    var service = {
      getProductos: getProductos,
      getRecetas: getRecetas,
    };

    return service;

    /////////////////////////////////////////

    function getProductos() {
      return $http.get('./js/productos.json');
    }

    function getRecetas() {
      return $http.get('./js/recetas.json');
    }

  }

  angular
    .module('jsonService', [])
    .factory('Consultas', Consultas);

})();

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