schoolApp.controller('homeController', function ($scope, $document, Article, MessageBox, Utility) {

    Article.getByKey("HIST")
       .then(function (article) {
           $scope.History = article.Content;

       }
       , function (error) {

       }
       );

    $scope.toTheTop = function () {
        $document.scrollTopAnimated(0, 5000).then(function () {
        });
    }
    $scope.html = "<h1>Hello</h1>";

    $scope.gotoElement = function (elementId) {
        var section = angular.element(document.getElementById(elementId));
        $document.scrollToElementAnimated(section);
    };

}).value('duScrollOffset', 30);