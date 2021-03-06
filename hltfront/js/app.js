var myApp = angular.module('crud',['ngRoute','ui.router']);

myApp.config(function($stateProvider,$routeProvider,$locationProvider){
  $routeProvider
  .when('/',
    {
      controller: 'ordersCtrl',
      templateUrl:'templates/orders.html'
    }
  )
  .when('/createorder',
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
