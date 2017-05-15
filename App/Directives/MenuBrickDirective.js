schoolApp.directive("menuBrick", function ()
{
    return {
        restrict: 'E',
        scope: {
            menuTitle: '@?',
            showLink: '@?',
            isSelected: '@?',
        },
        templateUrl: 'Views/Templates/Brick.html',

    };
});