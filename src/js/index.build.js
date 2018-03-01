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
      // .when('/productos/:id', {
      //   template: '<categoria></categoria>'
      // })
      // .when('/producto/:id', {
      //   template: '<producto></producto>'
      // })
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
      'app',
      'menu',
      'home',
      'productos',
      // 'categoria',
      // 'producto',
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