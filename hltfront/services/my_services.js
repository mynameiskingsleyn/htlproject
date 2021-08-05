
var orderServices = function($http){
  // this.setCookies = function (cookieName, value){
  //   $cookieStore.put(cookieName,value);
  // }
  //
  // this.getCookie = function(cookieName){
  //   return $cookieStore.get(cookieName);
  // }
  this.getToken = function (){
    return "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbC5obHRiYWNrLmNvbVwvYXBpXC9yZWdpc3RlciIsImlhdCI6MTYyODE5NjU2MCwiZXhwIjoxNjI4MjAwMTYwLCJuYmYiOjE2MjgxOTY1NjAsImp0aSI6IklHajJVRmJ2a01nbTFKcjAiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.klVZDtQ2LLNTp4eY--VVdwPGl8wjyqSLsKJGPVXkUdE";
  }
  this.getElObjFromArray = function(myArray,prop,val){
    for(var i = 0, length = myArray.length; i < length; i++){
      if(myArray[i][prop] == val){
        return myArray[i];
      }
    }
  }
}
