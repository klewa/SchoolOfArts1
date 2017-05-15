schoolApp.controller('contactInfoController', function ($scope, $document, Contact) {
    Contact.get().then(function (address) {
        $scope.Contact = address;
    }
    , function (error) {

        $scope.status = 'Unable to load Contact data: ' + error.message;
    });
});