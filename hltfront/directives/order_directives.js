var ngCustomChange = function($parse){
  return function(scope, element, attrs){
    var fn = $parse(attrs.ngCustomChange);
    element.bind('change', function(event){
      scope.$apply(function(){
        event.preventDefault();
        fn(scope,{$event:event});
      })
    })
  }
}
