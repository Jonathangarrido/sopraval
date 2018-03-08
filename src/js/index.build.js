// **********************************************************
// archivo index
// **********************************************************
'use strict';

(function () {

  config.$inject = ['$routeProvider', '$locationProvider', 'AnalyticsProvider'];
  function config($routeProvider, $locationProvider, AnalyticsProvider) {
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

    // initial configuration
    AnalyticsProvider.setAccount('UA-115170405-1');

    // track all routes/states (or not)
    AnalyticsProvider.trackPages(true);

    // Use analytics.js instead of ga.js
    AnalyticsProvider.useAnalytics(true);

    AnalyticsProvider.trackPrefix('Sopraval');

    // change page event name
    AnalyticsProvider.setPageEvent('$stateChangeSuccess');
  }

  Run.$inject = ['Analytics'];
  function Run(Analytics) {
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
      'angular-google-analytics'
    ])
    .config(config)
    .run(Run);

})();
// **********************************************************
// archivo component/app
// **********************************************************
'use strict';

appCtrl.$inject = ['setDatos', '$scope'];
function appCtrl(setDatos, $scope) {
  var vm = this;
  vm.animation = [];

  ////////////////////////////////////////////

  vm.$onInit = function () {
    watchAnimate();

    angular.element(document).ready(function () {
      $('.loading').addClass('loading-out');
    });

  };

  function watchAnimate() {
    $scope.$watch(function () {
      return setDatos.animate;
    }, function (newVal, oldVal) {
      vm.animation = newVal;
    });
  }

}

angular.module('app', [])
  .component('app', {
    templateUrl: './js/component/app/app.html',
    controller: appCtrl
  });
// **********************************************************
// archivo component/common/fondo
// **********************************************************
'use strict';

fondoCtrl.$inject = [];
function fondoCtrl() {
  var vm = this;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    
  };

}

angular.module('fondo', [])
  .component('fondo', {
    templateUrl: './js/component/common/fondo/fondo.html',
    controller: fondoCtrl,
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
  vm.tipoClass;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    watchDatos();
  };

  function watchDatos() {
    $scope.$watch(function () {
      return setDatos.listDatos;
    }, function (newVal, oldVal) {
      vm.items = newVal;

      newVal.length ? vm.openList = true : vm.openList = false;
    });

    $scope.$watch(function () {
      return setDatos.listTipo;
    }, function (newVal, oldVal) {
      vm.newTipo = newVal;
      vm.newTipo === 'productos' ? vm.tipoClass = false : vm.tipoClass = true;
    });

    $scope.$watch(function () {
      return setDatos.url;
    }, function (newVal, oldVal) {
      vm.volver = newVal;
    });
  }

  vm.back = function () {
    var url = setDatos.setUrl(vm.volver);
    $timeout(function () {
      setDatos.setAnimate('fade');
      $scope.$apply();
      $location.path(url);
    }, 100);
  };

}

angular.module('lista', [])
  .component('lista', {
    templateUrl: './js/component/common/lista/lista.html',
    controller: listaCtrl,
  });
// **********************************************************
// archivo component/common/menu
// **********************************************************
'use strict';

menuCtrl.$inject = ['setDatos', '$location', '$scope', '$timeout'];
function menuCtrl(setDatos, $location, $scope, $timeout) {
  var vm = this;
  vm.toggleFullscreen;
  vm.toggleFullscreenActive;
  vm.visible;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    vm.clickMenuFullscreen();
    watchDatos();
    menuActive();
  };

  vm.back = function () {

    setDatos.setAnimate('fade');
    $timeout(redireccionar, 100);
    $timeout(menuActive, 100);
    $timeout(function () {
      vm.toggleFullscreen = false;
      vm.toggleFullscreenActive = false;
    }, 500);
  };

  function redireccionar() {
    $location.path('/');
  }

  vm.menuFullscreen = function () {
    vm.toggleFullscreen = !vm.toggleFullscreen;
    vm.toggleFullscreenActive = vm.toggleFullscreen;
  };

  vm.clickMenuFullscreen = function () {
    $('.menu-modal a').click(function () {
      vm.toggleFullscreen = false;
      vm.toggleFullscreenActive = false;
    });
  };

  function watchDatos() {
    $scope.$watch(function () {
      return setDatos.visible;
    }, function (newVal, oldVal) {
      vm.visible = newVal;
    });
  }

  function menuActive() {
    $timeout(function () {
      setDatos.setVisible(false);
      $scope.$apply();
    }, 100);
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
}

angular.module('categoria', [])
  .component('categoria', {
    templateUrl: './js/component/pages/categoria/categoria.html',
    controller: categoriaCtrl
  });
// **********************************************************
// archivo component/pages/contacto
// **********************************************************
'use strict';

contactoCtrl.$inject = [];
function contactoCtrl() {
  var vm = this;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    
  };

}

angular.module('contacto', [])
  .component('contacto', {
    templateUrl: './js/component/common/contacto/contacto.html',
    controller: contactoCtrl,
  });
// **********************************************************
// archivo component/pages/empresa
// **********************************************************
'use strict';

empresaCtrl.$inject = [];
function empresaCtrl() {
  var vm = this;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    
  };

}

angular.module('empresa', [])
  .component('empresa', {
    templateUrl: './js/component/common/empresa/empresa.html',
    controller: empresaCtrl,
  });
// **********************************************************
// archivo component/pages/home
// **********************************************************
'use strict';

homeCtrl.$inject = ['setDatos', '$scope', '$timeout', 'Analytics'];
function homeCtrl(setDatos, $scope, $timeout, Analytics) {
  var vm = this;
  vm.active;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    animate();
    cleanList();
    analytics();
  };

  function animate() {
    $timeout(function () {
      setDatos.setAnimate('slideIn');
      $scope.$apply();
    }, 800);
  }

  function cleanList() {
    $timeout(function () {
      setDatos.setList([], '');
      $scope.$apply();
    }, 100);
  }

  function analytics() {
    Analytics.trackEvent('page', 'home');
  }

  vm.collapse = function () {
    vm.active = !vm.active;
  };

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

productoCtrl.$inject = ['Consultas', '$location', 'setDatos', '$scope', '$timeout', 'Analytics'];
function productoCtrl(Consultas, $location, setDatos, $scope, $timeout, Analytics) {
  var vm = this;
  vm.urlAll = $location.path().split('/');
  vm.urlCategoria = vm.urlAll[2];
  vm.urlProducto = vm.urlAll[3];

  ////////////////////////////////////////////

  vm.$onInit = function () {
    getData();
    animate();
    fondo();
    volver();
    analytics();
  };

  function analytics() {
    Analytics.trackEvent('page', 'productos', vm.urlCategoria, vm.urlProducto);
  }

  function volver() {
    $timeout(function () {
      setDatos.setBack(vm.urlAll);
      $scope.$apply();
    }, 100);
  }

  function animate() {
    $timeout(function () {
      setDatos.setAnimate();
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
    $('.producto-fondo').css('background-image', 'url(./img/fondos/f-' + vm.urlCategoria + '.jpg)');
  }

  function imagen() {
    $('.producto-titulo-fondo').css('background-image', 'url(./img/productos/' + vm.producto.categoria + '/' + vm.producto.imagen + '.jpg)');
  }

}

angular.module('producto', [])
  .component('producto', {
    templateUrl: './js/component/pages/producto/producto.html',
    controller: productoCtrl,

  });

// **********************************************************
// archivo component/pages/receta
// **********************************************************
'use strict';

recetaCtrl.$inject = ['$location', 'Consultas', 'setDatos', '$timeout', '$scope', 'Analytics'];
function recetaCtrl($location, Consultas, setDatos, $timeout, $scope, Analytics) {
  var vm = this;
  vm.urlAll = $location.path().split('/');
  vm.url = vm.urlAll[2];
  vm.producto;

  ////////////////////////////////////////////

  vm.$onInit = function () {
    getData();
    volver();
    analytics();
  };

  function analytics() {
    Analytics.trackEvent('page', 'recetas', vm.url);
  }

  function volver() {
    $timeout(function () {
      setDatos.setBack(vm.urlAll);
      $scope.$apply();
    }, 100);
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

      $timeout(function () {
        setDatos.setList(data, 'recetas');
        $scope.$apply();
      }, 100);
    });
  }

}

angular.module('receta', [])
  .component('receta', {
    templateUrl: './js/component/pages/receta/receta.html',
    controller: recetaCtrl
  });
// **********************************************************
// archivo component/pages/productos
// **********************************************************
'use strict';

productosCtrl.$inject = ['setDatos', '$scope', '$timeout', 'Analytics'];
function productosCtrl(setDatos, $scope, $timeout, Analytics) {
  var vm = this;
  vm.categorias = [
    { tipo: 'tradicional', nombre: 'Tradicional' },
    { tipo: 'jamones-pechugas', nombre: 'Jamones y Pechugas' },
    { tipo: 'parrilleros', nombre: 'Parrilleros' },
    { tipo: 'practicos', nombre: 'Prácticos' }
  ];
  vm.background = [];

  ////////////////////////////////////////////

  vm.$onInit = function () {
    animate();
    cleanList();
    menuActive();
    analytics();
  };

  vm.backgroundOver = function (categoria) {
    vm.background = [];
    switch (categoria) {
      case 'jamones-pechugas': vm.background.jamonesPechugas = true; break;
      case 'tradicional': vm.background.tradicional = true; break;
      case 'parrilleros': vm.background.parrilleros = true; break;
      case 'practicos': vm.background.practicos = true; break;
    }
  };

  function analytics() {
    Analytics.trackEvent('page', 'productos');
  }

  function animate() {
    $timeout(function () {
      setDatos.setAnimate();
      $scope.$apply();
    }, 800);
  }

  function cleanList() {
    $timeout(function () {
      setDatos.setList([], '');
      $scope.$apply();
    }, 100);
  }

  function menuActive() {
    $timeout(function () {
      setDatos.setVisible(true);
      $scope.$apply();
    }, 100);
  }

}

angular.module('productos', [])
  .component('productos', {
    templateUrl: './js/component/pages/productos/productos.html',
    controller: productosCtrl
  });

// **********************************************************
// archivo component/pages/recetas
// **********************************************************
'use strict';

recetasCtrl.$inject = ['$location', 'Consultas', 'setDatos', '$timeout', '$scope', 'Analytics'];
function recetasCtrl($location, Consultas, setDatos, $timeout, $scope, Analytics) {
  var vm = this;
  vm.urlAll = $location.path().split('/');
  vm.url = vm.urlAll[2];

  ////////////////////////////////////////////

  vm.$onInit = function () {
    getDatos();
    volver();
    menuActive();
    animate();
    analytics();
  };

  function analytics() {
    Analytics.trackEvent('page', 'recetas');
  }

  function animate() {
    $timeout(function () {
      setDatos.setAnimate('fade');
      $scope.$apply();
    }, 800);
  }

  function volver() {
    $timeout(function () {
      setDatos.setBack(vm.urlAll);
      $scope.$apply();
    }, 100);
  }

  function getDatos() {
    Consultas.getRecetas().then(function (response) {
      var data = response.data;
      $timeout(function () {
        setDatos.setList(data, 'recetas');
        $scope.$apply();
      }, 100);
    });
  }

  function menuActive() {
    $timeout(function () {
      setDatos.setVisible(true);
      $scope.$apply();
    }, 100);
  }
}

angular.module('recetas', [])
  .component('recetas', {
    templateUrl: './js/component/pages/recetas/recetas.html',
    controller: recetasCtrl
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
      setBack: setBack,
      url: '',
      visible: true,
      setVisible: setVisible
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

  }

  angular
    .module('setDatos', [])
    .factory('setDatos', setDatos);

})();