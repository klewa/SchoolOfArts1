//http://stackoverflow.com/questions/22841225/ngmodel-formatters-and-parsers/27432203#27432203

schoolApp.directive('employeeSexValueConverter', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {
            function fromUser(value) {
                return value ? "H" : "M";
            }

            function toUser(value) {
                if (value == "H") return true;
                return false;
            }
            ngModel.$parsers.push(fromUser);
            ngModel.$formatters.push(toUser);
            },
    };
});