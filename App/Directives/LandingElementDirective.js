schoolApp.directive("landingElement", function ()
{
    return {
        restrict: 'E',
        scope: {
            currentPage: '@?'
        },
        templateUrl: 'Views/Templates/LandingElement.html',

    };
});