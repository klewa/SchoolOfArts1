
schoolApp.controller('informationDetailController', function ($scope, $document, $routeParams, Article, picturesDownloadUrl, $timeout, Utility) {

    var key = $routeParams.keyID;
    $scope.picturesDownloadUrl = picturesDownloadUrl;
    Article.getByKey(key).then(function (article) {
        $scope.Article = article;
    },
       function (error) {

       });

    $scope.gotoElement = function (elementId) {
        var section = angular.element(document.getElementById(elementId));
        $document.scrollToElementAnimated(section);
    };

    $scope.toTheTop = function () {
        $document.scrollTopAnimated(0, 5000).then(function () {
        });
    }

    $timeout(function () {
        $scope.gotoElement('pageNameAnchor');
    }, 500);

    Utility.scrollDown();
    
});