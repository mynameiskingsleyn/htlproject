var myApp = angular.module('crud',['ngRoute']);

myApp.config(function($routeProvider,$locationProvider){
  $routeProvider
  .when('/',
    {
      controller: 'ordersCtrl',
      templateUrl:'templates/orders.html'
    }
  )
  .when('/createPost',
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
  .when('/deleteOrder/:id',
    {
      controller: 'deleteCtrl',
      templateUrl:'templates/delete.html'
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
