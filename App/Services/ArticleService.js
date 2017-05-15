schoolApp.factory("Article", function ($http, $q, urlBase) {
    // http://localhost:3000/api/locations/findOne?filter[where][city]=Scottsdale

    var factory = {};
    var urlSpecific = 'Articles';

    factory.getAll = function () {
        return $http.get(urlBase + urlSpecific).then(function (response) {
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
    //findOne?filter[where][Key]=INFO_MUS_INSTR_CANTO
    factory.getByKey = function (key) {
        return $http.get(urlBase + urlSpecific + "/findOne?filter[where][Key]=" + key)
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