schoolApp.directive("event", function ()
{
    return {
        restrict: 'E',
        scope: {
            date: '@?',
            title: '@?',
            resume: '@?',
            imageUrl: '@?',
            downloadUrl: '@?',
            id: '@?'
        },
        templateUrl: 'Views/Templates/Event.html',

    };
});