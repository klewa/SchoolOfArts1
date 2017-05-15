
schoolApp.controller('eventDetailController', function ($scope, $document, $routeParams, Event, picturesDownloadUrl, $timeout) {

    var key = $routeParams.keyID;
    $scope.picturesDownloadUrl = picturesDownloadUrl;
    Event.getById(key).then(function (event) {
        $scope.Event = event;
    }
    , function (error) {

        $scope.status = 'Unable to load Contact data: ' + error.message;
    });

    $scope.toTheTop = function () {
        $document.scrollTopAnimated(0, 3000).then(function () {
        });
    };

    $timeout(function () {
        $scope.gotoElement('pageNameAnchor');
    }, 500);


    $scope.gotoElement = function (elementId) {
        var section = angular.element(document.getElementById(elementId));
        $document.scrollToElementAnimated(section);
    };

});