angular.module('app').controller('controller', function($scope, service) {

    $scope.send = function(newObj){
        service.send(newObj)
    }

})