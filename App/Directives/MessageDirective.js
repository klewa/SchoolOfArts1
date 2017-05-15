schoolApp.directive("message", function ()
{
    return {
        restrict: 'E',
        scope: {
            validityDate: '@?',
            title: '@?',
            message: '@?',
            publicationDate: '@?'
        },
        templateUrl: 'Views/Templates/Message.html',

    };
});