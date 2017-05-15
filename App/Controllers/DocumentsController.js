schoolApp.controller('documentsController', function ($scope, $document, Document, pdfsDownloadUrl, Utility) {

    $scope.pdfsDownloadUrl = pdfsDownloadUrl;

    $scope.toTheTop = function () {
        $document.scrollTopAnimated(0, 5000).then(function () {
            console && console.log('You just scrolled to the top!');
        });
    }

    $scope.gotoElement = function (elementId) {
        var section = angular.element(document.getElementById(elementId));
        $document.scrollToElementAnimated(section);
    };

    Document.getAll().then(function (documents) {

        $scope.Documents = {};
        for (var i = 0; i < documents.length; i++)
        {
            var doc = documents[i];
            $scope.Documents[doc.Key] = doc;
        }
    },
       function (error) {

       });

    Utility.scrollDown();
}).value('duScrollOffset', 30);