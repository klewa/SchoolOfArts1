schoolApp.controller('informationCoursesController', function ($scope, $document, Utility) {

    $scope.toTheTop = function () {
        $document.scrollTopAnimated(0, 5000).then(function () {
            console && console.log('You just scrolled to the top!');
        });
    }

    $scope.gotoElement = function (elementId) {
        var section = angular.element(document.getElementById(elementId));
        $document.scrollToElementAnimated(section);
    };

    Utility.scrollDown();
}).value('duScrollOffset', 30);;;