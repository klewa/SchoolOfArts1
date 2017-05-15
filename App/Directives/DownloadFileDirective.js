schoolApp.directive("downloadFile", function ()
{
    return {
        restrict: 'E',
        scope: {
            fileTitle: '@?',
            fileSrc: '@?',
            downloadPath: '@?',
            textLimit: '@?',
            popover: '@?'
        },
        templateUrl: 'Views/Templates/DownloadFile.html',

    };
});