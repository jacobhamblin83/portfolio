angular.module('app').controller('controller', function($scope, service) {
    $scope.test = 'hello';
    $scope.servicetest = service.test;

    $scope.send = function(newObj){
        service.send(newObj)
    }

})