schoolApp.directive("employee", function ()
{
    return {
        restrict: 'E',
        scope: {
            name: '@',
            surname: '@',
            discipline: '@',
            imageUrl: '@',
            biography: '@',
            downloadUrl: '@?',
            sex: '@?'
        },
        templateUrl: 'Views/Templates/Professor.html',

    };
});