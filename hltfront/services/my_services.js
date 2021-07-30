
var orderServices = function($http){

  this.getElObjFromArray = function(myArray,prop,val){
    for(var i = 0, length = myArray.length; i < length; i++){
      if(myArray[i][prop] == val){
        return myArray[i];
      }
    }
  }
}
