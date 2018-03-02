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
      // .when('/recetas', {
      //   template: '<recetas></recetas>'
      // })
      // .when('/receta/:id', {
      //   template: '<receta></receta>'
      // })
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
      // 'recetas',
      // 'receta',
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
// archivo component/common/lista
// **********************************************************
'use strict';

listaCtrl.$inject = ['$window', '$location', 'setDatos', 'Consultas'];
function listaCtrl($window, $location, setDatos, Consultas) {
  var vm = this;
  vm.newDatos;
  vm.newTipo;
  vm.items;
  vm.urlAll = $location.path().split('/');

  ////////////////////////////////////////////

  vm.$onInit = function () {
    getData();
  }

  vm.$onChanges = function () {
    vm.newTipo = $window.angular.copy(this.tipo);
    vm.volver = setDatos.setUrl($window.angular.copy(this.url))
  }

  function getData() {
    if(vm.urlAll[1] === 'productos'){
      Consultas.getProductos().then(function (response) {
        var data = response.data;
        var datos = data.filter(function (producto) {
          return producto.categoria === vm.urlAll[2];
        });
        vm.items = datos;
      })
    }else if (vm.urlAll[1] === 'recetas'){

    }

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

  ////////////////////////////////////////////

  vm.$onInit = function () {
    
  }

  vm.back = function () {
    setDatos.setAnimate('fade');
    $timeout(redireccionar,100)
  }

  function redireccionar(){
    $location.path("/");
  }

}

angular.module('menu', [])
  .component('menu', {
    templateUrl: './js/component/common/menu/menu.html',
    controller: menuCtrl
  });

// **********************************************************
// archivo component/pages/categoria
// **********************************************************
'use strict';

categoriaCtrl.$inject = ['$location', 'Consultas', 'setDatos'];
function categoriaCtrl($location, Consultas, setDatos) {
  var vm = this;
  vm.urlAll = $location.path().split('/');
  vm.url = vm.urlAll[2];

  ////////////////////////////////////////////

  vm.$onInit = function () {
    titulo();
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
// **********************************************************
// archivo component/pages/home
// **********************************************************
'use strict';

homeCtrl.$inject = ['setDatos', '$scope', '$timeout'];
function homeCtrl(setDatos, $scope, $timeout) {
  var vm = this;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    animate();
  }

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
    })
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

  ////////////////////////////////////////////

  vm.$onInit = function () {
    animate();
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
      setAnimate: setAnimate
    };

    return service;

    /////////////////////////////////////////

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