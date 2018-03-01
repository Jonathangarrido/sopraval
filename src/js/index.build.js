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

appCtrl.$inject = ['Consultas'];
function appCtrl(Consultas) {
  var vm = this;

  init();

  ////////////////////////////////////////////

  function init() {

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

listaCtrl.$inject = ['$window', '$location', 'setDatos'];
function listaCtrl($window, $location, setDatos) {
  var vm = this;
  vm.newDatos;
  vm.newTipo;

  ////////////////////////////////////////////

  this.$onInit = function () {

  }

  this.$onChanges = function () {
    vm.newDatos = setDatos.setArray($window.angular.copy(this.datos));
    vm.newTipo = $window.angular.copy(this.tipo);
    vm.volver = setDatos.setUrl($window.angular.copy(this.url))
  }

}

angular.module('lista', [])
  .component('lista', {
    bindings: {
      datos: '@',
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

menuCtrl.$inject = [];
function menuCtrl() {
  var vm = this;
  init();

  ////////////////////////////////////////////

  function init() {
    
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
    getData();
    titulo();
  }

  function getData() {
    Consultas.getProductos().then(function (response) {
      var data = response.data;
      var datos = data.filter(function (producto) {
        return producto.categoria === vm.url;
      });
      vm.productos = datos;
    })
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

homeCtrl.$inject = [];
function homeCtrl() {
  var vm = this;
  init();

  ////////////////////////////////////////////

  function init() {
    
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

productoCtrl.$inject = ['Consultas', '$location', 'setDatos'];
function productoCtrl(Consultas, $location, setDatos) {
  var vm = this;
  vm.urlAll = $location.path().split('/');
  vm.urlCategoria = vm.urlAll[2];
  vm.urlProducto = vm.urlAll[3];

  ////////////////////////////////////////////

  this.$onInit = function () {
    getData();
    titulo();
  }

  function getData() {
    Consultas.getProductos().then(function (response) {
      var data = response.data;

      // obtengo todos los productos con la categoria
      var datos = data.filter(function (producto) {
        return producto.categoria === vm.urlCategoria;
      });
      vm.productos = datos;

      // obtengo el producto
      var dato = data.filter(function (producto) {
        return producto.id === vm.urlProducto;
      });
      vm.producto = dato[0];
    })
  }

  function titulo() {
    vm.categoria = setDatos.setCategoria();
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

productosCtrl.$inject = [];
function productosCtrl() {
  var vm = this;
  init();

  ////////////////////////////////////////////

  function init() {
    
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
      setArray: setArray
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

    function setArray(data) {
      return JSON.parse(data)
    }

  }

  angular
    .module('setDatos', [])
    .factory('setDatos', setDatos);

})();