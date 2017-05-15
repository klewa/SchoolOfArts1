schoolApp.directive("pdfViewer", function () {
    return {
        restrict: 'E',
        scope: {
            title: '@?',
            fileUrl: '@?',
            downloadUrl: '@?'
        },
        templateUrl: 'Views/Templates/PDFViewer.html',

    };
});