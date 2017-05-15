schoolApp.controller('staffController', function ($scope, $document, Employee, picturesDownloadUrl, Utility) {

    $scope.downloadUrl = picturesDownloadUrl;

    Employee.getByIsTeacher(true)
       .then(function (employees) {
           $scope.Teachers = employees;

       }
       , function (error) {

       }
       );

    Employee.getByIsTeacher(false)
       .then(function (employees) {
           $scope.OtherEmployees = employees;

       }
       , function (error) {

       }
       );

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

}).value('duScrollOffset', 30);;