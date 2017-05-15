schoolApp.factory("Attachment", function ($http, $q, urlBase) {
    // http://localhost:3000/api/locations/findOne?filter[where][city]=Scottsdale
    //DELETE /Attachments/{container}/files/{file}
    var factory = {};
    var urlSpecific = 'Attachments';

    factory.delete = function (containter, fileName) {
        return $http.delete(urlBase + urlSpecific + '/' + containter + '/files/'+ fileName).then(function (response) {
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