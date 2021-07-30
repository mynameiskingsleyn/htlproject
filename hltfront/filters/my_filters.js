/// <reference path="../assets/bower_components/angular/angular.js />"

var my_date_f = function(){
  return function(date){
    var new_d = date.replaceAll('-','/');
    return new_d;
  }
}
 String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
