schoolApp.directive("downloadFiles", function ()
{
    return {
        restrict: 'E',
        scope: {
            fileTitle: '@?',
            maleFileSrc: '@?',
            femaleFileSrc: '@?',
            downloadPath: '@?',
            malePopover: '@?',
            femalePopover: '@?',
        },
        templateUrl: 'Views/Templates/DownloadFiles.html',

    };
});