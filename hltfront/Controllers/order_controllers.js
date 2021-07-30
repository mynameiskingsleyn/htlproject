var ordersCtrl = function($scope,$http,orderServices){
  var title = "All posts";
  $scope.title= title;
  console.log(title);
  var url = "http://local.hltback.com/api/orders";
  $http.get(url)
        .then(function(response){
          //console.log(response.data.orders);
          $scope.orders = response.data.orders;
          var num = $scope.orders.length;
          $scope.rowMax = num;
          console.log($scope.orders);

          if($scope.rowMax==undefined){
            $scope.rowMax =10;
          }
          //console.log($scope.posts);
          $scope.rowLimit = 2;
          $scope.order="id";
          $scope.reverseSort = false;

          $scope.sortData = function(column){
            console.log(column);
            $scope.reverseSort=($scope.order == column)? !$scope.reverseSort:false;
            $scope.order=column;
          }
          $scope.getSortClass = function(column){
            if($scope.order == column){
              return $scope.reverseSort? 'arrow-down':'arrow-up';

            }
            return '';
          }

        });
        $scope.deleteOrder = function(id){
          var orders = $scope.orders;
          console.log('input id is '+id)
          for(var i = 0;i < orders.length; i++){
            var obj = orders[i];
            if(id == obj.id){
              orders.splice(i,1);
              $scope.deleteOrderCall(id);
            }
          }
          $scope.orders = orders;
        }
        $scope.deleteOrderCall = function(id){
          var ajax_url = 'http://local.hltback.com/api/orders/'+id;
          $.ajax({
              type:'DELETE',
              url:ajax_url,
              cache:false,
              success:function(result){
              },
              error:function(xhr, ajaxOptions, thrownError){
              }
          });
        }
}

var createCtrl = function($scope,$http,orderServices){
  var ajax_url = 'http://local.hltback.com/api/orders';
  var title = "Create an Order";
  $scope.title = title;
  var vehiclesApiUrl = 'http://local.hltback.com/api/vehicles';
  var techApiUrl = 'http://local.hltback.com/api/technicians';
  $scope.vehicles = null;
  $scope.technicians = null;
  $scope.selectedVehicle = null;
  $scope.vehicleKeys = [];
  $http.get(vehiclesApiUrl)
    .then(function(response){
      $scope.vehicles =response.data.vehicles;

    });

  $http.get(techApiUrl)
      .then(function(response){
        $scope.technicians =response.data.technicians;
  });
  $scope.loadKeys = function(){
    $scope.selectedVehicle= orderServices.getElObjFromArray($scope.vehicles,'id',$scope.vehicle.id);
    $scope.vehicleKeys = $scope.selectedVehicle.keys;


  }
  $scope.addOrder = function(){
    var vehicleId= null;
    var keyId = null;
    var techId = null;
    $scope.Error = "";
    if($scope.vehicle.id == null){
      $scope.Error = "Id missing";
    }
    if($scope.technician.id == null){
      $scope.Error = "tech missing";
    }
    if($scope.key.id == null){
      $scope.Error = "key missing";
    }


    var dataString = $("#createform").serialize();
    if($scope.Error.length > 0){
      $('#msg').html("<span class='error'>Error missing some entries</span>");
    }else{
      console.log(dataString);
      $('#msg').html("<span class='success'>Created</span>");

      $.ajax({
          type:'POST',
          url:ajax_url,
          data:dataString,
          cache:false,
          success:function(result){
            console.log(result);
            $("#msg").html(result.message);
          },
          error:function(xhr, ajaxOptions, thrownError){
            //var message = xhr.responseJSON.message;
            console.log(xhr);
            $('#msg').html("<span class='error'>Error missing some entries</span>");

          }
      });
    }
    return false;
  }
}

var editCtrl = function($scope,$http,$routeParams,orderServices){

  var id = $routeParams.id;
  console.log('id is '+id);
  $scope.title=" Edit ";
  var vehiclesApiUrl = 'http://local.hltback.com/api/vehicles';
  var techApiUrl = 'http://local.hltback.com/api/technicians';
  $scope.vehicles = null;
  $scope.technicians = null;
  var orderUrl = 'http://local.hltback.com/api/orders/'+id
  $scope.vehicleKeys = [];
  $http.get(vehiclesApiUrl)
    .then(function(response){
      // console.log(response);
      $scope.vehicles =response.data.vehicles;

    });

  $http.get(techApiUrl)
      .then(function(response){
        $scope.technicians =response.data.technicians;

  });
  $http({
      url:orderUrl,
      method:"get"
  })
  .then(function(response){
      var order = response.data.order;
      $scope.order = order;
      console.log($scope.order);
      $scope.keyId = order.key_id;
      $scope.techId = order.technician_id;
      $scope.vehicleId = order.vehicle_id;
      $scope.orderId = order.id;
      $scope.selectedVehicle = order.vehicleInfo;
      $scope.vehicleKeys.push(order.keyInfo);
      //$('#editform').on('submit',updatePost($scope.post));
  });

  $scope.loadKeys = function(){

    $scope.selectedVehicle= orderServices.getElObjFromArray($scope.vehicles,'id',$scope.vehicleId);
    $scope.vehicleKeys = $scope.selectedVehicle.keys;
  }
  $scope.selecedOption = function (item1, item2){
    var result = item1 == item2;
    return result;
  }


   $scope.updatePost =function(){
    //e.preventDefault();
    var ajax_url = 'http://local.hltback.com/api/orders/'+$scope.orderId;
    //console.log("update post called!!");

    var dataString = $('#editform').serialize();
    console.log(dataString);
    alert("functioin called");
    if($scope.vehicleId.length == 0 || $scope.keyId.length==0 || $scope.techId.length == 0){
      $('#msg').html("<span class='error'>Error missing some entries</span>");
    }else{
      // console.log('title is '+p_title);
      //$('#msg').html("<span class='success'>Saved</span>");
      var id = $scope.orderId;
      $.ajax({
          type:'PUT',
          url:ajax_url,
          params:{id:id},
          data:dataString,
          cache:false,
          success:function(result){
            $("#msg").html("Order has been saved");
            console.log("success");
          },
          error:function(err){
            //$("#msg").html(result.msg);
            console.log("not successful");
          }
      });
    }
    return false;
  }

}
var deleteCtrl = function($scope,$http,$routeParams){
  var id = $routeParams.id;
  var url = window.location.hostname;
  $http({
    url:'http://angphp.king/webservices/deletePost.php',
    params:{id:id},
    method:"get"
  })
  .then(function(response){
    $scope.posts = response.data;
    console.log($scope.posts);
  });

}