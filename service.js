angular.module('app').service('service', function($http) {

    this.send = (stuff) => {
        return $http.post('/api/contact', stuff)
    }
})