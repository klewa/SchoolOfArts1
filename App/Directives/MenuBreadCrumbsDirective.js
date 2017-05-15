schoolApp.directive("menuBreadCrumbs", function ()
{
    return {
        restrict: 'E',
        scope: {
            first: '@?',
            second: '@?'
        },
        templateUrl: 'Views/Templates/MenuBreadCrumbs.html',

    };
});