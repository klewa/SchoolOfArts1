schoolApp.controller('documentsMenuController', function ($scope, $document, Utility) {

    $scope.level = 1;
    $scope.section = 0;
    $scope.itemsSelected = [];

    $scope.openChild = function (level, section, $event) {
        

        if (level == 2) {

            Utility.scrollToElement('scrollingAnchorLevel2');
            
            $scope.itemsVisible = [];
            $scope.itemsVisible.push([2, section]);

            $scope.itemsSelected = [];
            $scope.itemsSelected[1] = [1, section, $event.target.innerText];
        }
        else if (level == 3) {
            Utility.scrollToElement('scrollingAnchorLevel3');
            
            for (var i = 0; i < $scope.itemsVisible.length; i++) {
                var inner = $scope.itemsVisible[i];

            }
            if (inner[0] == 3) {
                var index = $scope.itemsVisible.indexOf(inner);
                if (index >= 0) {
                    $scope.itemsVisible.splice(index, 1);
                }
            }
            $scope.itemsVisible.push([3, section]);
            $scope.itemsSelected[2] = [2, section, $event.target.innerText];
        }

    };

    $scope.itemsVisible = {};
    $scope.isActiveSelection = function (level, section)
    {
        var inner = $scope.itemsSelected[level];
        return inner && inner[1] == section;
    }

    $scope.isVisible = function (level, section) {

        for (var i = 0; i < $scope.itemsVisible.length; i++) {
            var inner = $scope.itemsVisible[i];
            if (inner[0] == level && inner[1] == section)
                return true;
        }
        return false;
    };
});