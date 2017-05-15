schoolApp.controller('informationCoursesMenuController', function ($scope, $document, Utility) {
    $scope.Name = "some name";
    $scope.infoLevel = 1;
    $scope.infoSection = 0;
    $scope.infoSelectedItems = [];

    $scope.coursLevel = 1;
    $scope.coursSection = 0;
    $scope.coursSelectedItems = [];
    $scope.coursLevelText = [];
    $scope.openChild = function (type, level, section, $event) {
        if (type == 'I') {
            this.infoLevel = level;
            this.infoSection = section;
            if (level == 2)
            {
                Utility.scrollToElement('scrollingAnchorInfoLevel2');
                $scope.infoSelectedItems = [];
                $scope.infoSelectedItems[1] = [1, section, $event.target.innerText];

                $scope.infoLevelText = [];
            }
            else if (level == 3)
            {
                
                Utility.scrollToElement('scrollingAnchorInfoLevel3');
                $scope.infoSelectedItems[2] = [2, section, $event.target.innerText];
            }
        }
        else if (type == 'C') {

            if (level == 2) {
                Utility.scrollToElement('scrollingAnchorCoursesLevel2');

                $scope.CoursesItemsVisible = [];
                $scope.CoursesItemsVisible.push([2, section]);

                $scope.coursSelectedItems = [];
                $scope.coursSelectedItems[1]=[1, section, $event.target.innerText];
            }
            else if (level == 3) {

                Utility.scrollToElement('scrollingAnchorCoursesLevel3');

                for (var i = 0; i < $scope.CoursesItemsVisible.length; i++) {
                    var inner = $scope.CoursesItemsVisible[i];
                    if (inner[0] == 3) {
                        var index = $scope.CoursesItemsVisible.indexOf(inner);
                        if (index >= 0) {
                            $scope.CoursesItemsVisible.splice(index, 1);
                        }
                    }
                }
                
                $scope.CoursesItemsVisible.push([3, section]);
                $scope.coursSelectedItems[2] = [2, section, $event.target.innerText];
            }
        }

    };

    $scope.CoursesItemsVisible = {};

    $scope.isVisible = function (type, level, section) {
        if (type == 'I') {
            return this.infoLevel >= level && (this.infoSection == section || section == 0);
        }
        else if (type == 'C') {
            for (var i = 0; i < $scope.CoursesItemsVisible.length; i++) {
                var inner = $scope.CoursesItemsVisible[i];
                if (inner[0] == level && inner[1] == section)
                    return true;
            }
            return false;
        }
        return false;
    };

    $scope.isActiveSelection = function (type, level, section) {

        if (type == 'I') {

            var inner = $scope.infoSelectedItems[level];
            return inner && inner[1] == section;
        }
        else if (type == 'C') {
            var inner = $scope.coursSelectedItems[level];
            return inner && inner[1] == section;
        }

    }

    $scope.navigateTo = function(path)
    {
        Utility.navigateTo(path);
    }
    
});