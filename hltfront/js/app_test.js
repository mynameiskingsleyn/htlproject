var myApp = angular.module('crud',['ngRoute','ui.router']);

myApp.config(function($stateProvider,$routeProvider,$locationProvider,$urlRouterProvider){
  //$urlRouterProvider.otherwise('/');

  // $stateProvider
  //   .state('home',{
  //     url:'/',
  //     controller: 'ordersCtrl',
  //     templateUrl:'templates/orders.html'
  //   })
  //   .state('create',{
  //     url:'/createOrder',
  //     controller: 'createCtrl',
  //     templateUrl:'templates/create.html'
  //   })
  //   .state('edit',{
  //     url:'/editOrder/:id',
  //     controller: 'createCtrl',
  //     templateUrl:'templates/create.html'
  //   })

  $routeProvider
  .when('/',
    {
      controller: 'ordersCtrl',
      templateUrl:'templates/orders.html'
    }
  )
  .when('/createOrder',
    {
      controller: 'createCtrl',
      templateUrl:'templates/create.html'
    }
  )
  .when('/editOrder/:id',
    {
      controller: 'editCtrl',
      templateUrl:'templates/edit.html'
    }
  )
  .otherwise({
      redirectTo:'/'
  });
  $locationProvider.html5Mode(true);
});
myApp.controller("ordersCtrl",ordersCtrl);
myApp.controller("createCtrl",createCtrl);
myApp.controller("editCtrl",editCtrl);
myApp.service("orderServices",orderServices);
myApp.directive("ngCustomChange", ngCustomChange);
