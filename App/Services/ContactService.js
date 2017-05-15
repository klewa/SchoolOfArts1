schoolApp.factory("Contact", function ($http, $q, urlBase) {

    var factory = {};
    var urlSpecific = 'Addresses';
    factory.get = function () {
        return $http.get(urlBase + urlSpecific + "/findOne")
        .then(function (response) {
            if (typeof response.data === 'object') {
                return response.data;
            } else {
                // invalid response
                return $q.reject(response.data);
            }

        }, function (response) {
            // something went wrong
            return $q.reject(response.data);
        });
    };

    factory.update = function (obj) {
        return $http.put(urlBase + urlSpecific + '/' + obj.id, obj).then(function (response) {
            if (typeof response.data === 'object') {
                return response.data;
            } else {
                // invalid response
                return $q.reject(response.data);
            }

        }, function (response) {
            // something went wrong
            return $q.reject(response.data);
        });
    };

    return factory;
});