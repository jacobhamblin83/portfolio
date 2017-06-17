angular.module('app').controller('controller', function($scope, service) {

    $scope.send = function(newObj){
        console.log(newObj)
        service.send(newObj)
    }

})