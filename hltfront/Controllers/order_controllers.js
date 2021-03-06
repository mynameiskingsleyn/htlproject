var ordersCtrl = function($scope,$http,orderServices){
  var title = "All Orders";
  $scope.title= title;
  $scope.pageNumber = 1;
  $scope.disablePrev = true;
  $scope.resultCount = 10;
  $scope.rowLimit = 10;
  $scope.order="id";
  $scope.reverseSort = false;
  var fetchData = function(){
    var url = "http://local.hltback.com/api/orders?page="+$scope.pageNumber+"&count="+$scope.resultCount;
    $scope.disableNext = false;
    $http.get(url)
          .then(function(response){
            $scope.orders = response.data.orders;
            var num = $scope.orders.length;
            $scope.rowMax = num;

            if($scope.rowMax==undefined){
              $scope.rowMax =$scope.rowLimit;
            }
            if(num < $scope.resultCount){
              $scope.disableNext = true;
            }
          });
    }
        fetchData();

        $scope.sortData = function(column){ //console.log(column); console.log($scope.orders);
          $scope.reverseSort=($scope.order == column)? !$scope.reverseSort:false;
          $scope.order=column;
        }
        $scope.getSortClass = function(column){
          if($scope.order == column){
            return $scope.reverseSort? 'arrow-down':'arrow-up';

          }
          return '';
        }
    $scope.deleteOrder = function(id){
          var orders = $scope.orders;
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

        $scope.updatePage = function(direction){
          console.log(direction);
          if(direction =="up"){
            $scope.nextPage();
          }else{
            $scope.prevPage();
          }
        }

        $scope.nextPage = function (){
          var pNumber = $scope.pageNumber;
          $scope.pageNumber++;
          if(pNumber != $scope.pageNumber){
            fetchData();
          }

        }
        $scope.prevPage = function (){
          var pNumber = $scope.pageNumber;
          if($scope.pageNumber > 1){
            $scope.pageNumber--;
          }
          if(pNumber != $scope.pageNumber){
            fetchData();
          }
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
      // console.log(dataString);
      $('#msg').html("<span class='success'>Created</span>");

      $.ajax({
          type:'POST',
          url:ajax_url,
          data:dataString,
          cache:false,
          success:function(result){
            // console.log(result);
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
  // console.log('id is '+id);
  $scope.title=" Edit ";
  var vehiclesApiUrl = 'http://local.hltback.com/api/vehicles';
  var techApiUrl = 'http://local.hltback.com/api/technicians';
  $scope.vehicles = null;
  $scope.technicians = null;
  $scope.order = null;
  var orderUrl = 'http://local.hltback.com/api/orders/'+id
  $scope.vehicleKeys = [];
  $scope.order = null;
  $scope.keyId = null;
  $scope.techId = null;
  $scope.vehicleId = null;
  $scope.orderId = null;
  $scope.selectedVehicle = null;
  $http.get(orderUrl)
  .then(function(response){
      var order = response.data.order;
      $scope.order = order;
      // console.log($scope.order);
      $scope.keyId = order.key_id;
      $scope.techId = order.technician_id;
      $scope.vehicleId = order.vehicle_id;
      $scope.selectedVehicle = order.vehicle_id;
      $scope.orderId = order.id;
      $scope.selectedVehicle = order.vehicleInfo;
      $scope.vehicleKeys.push(order.keyInfo);
      $http.get(vehiclesApiUrl)
        .then(function(response){
          $scope.vehicles =response.data.vehicles;
          $scope.loadKeys('true');
        });

      $http.get(techApiUrl)
          .then(function(response){
            $scope.technicians =response.data.technicians;
      });

  });



  $scope.loadKeys = function(initial){
    if(initial !== 'true'){
      $scope.vehicleId = $('#vehicle_id').val();
    }
    $scope.selectedVehicle= orderServices.getElObjFromArray($scope.vehicles,'id',$scope.vehicleId);
    $scope.vehicleKeys = $scope.selectedVehicle.keys;
  }


   $scope.updatePost =function(){
    var ajax_url = 'http://local.hltback.com/api/orders/'+$scope.orderId;
    var dataString = $('#editform').serialize();
    var newVehicleId = $("#vehicle_id").val();
    var newTechId = $("#technician_id").val();
    var newKeyId = $("#key_id").val();
    if(newVehicleId.length == 0 || newTechId.length==0 || newKeyId.length == 0){
      $('#msg').html("<span class='error'>Error missing some entries</span>");
    }else{
      var id = $scope.orderId;
      $.ajax({
          type:'PUT',
          url:ajax_url,
          params:{id:id},
          data:dataString,
          cache:false,
          success:function(result){
            $("#msg").html("Order has been saved");
            // console.log("success");
          },
          error:function(err){
            // console.log("not successful");
          }
      });
    }
    return false;
  }

}
