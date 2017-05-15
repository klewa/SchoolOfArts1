schoolApp.controller('LoginController', function ($scope, ngDialog, $localStorage, AuthFactory) {

    $scope.loginData = $localStorage.getObject('userinfo', '{}');

    $scope.doLogin = function () {
        if ($scope.rememberMe)
            $localStorage.storeObject('userinfo', $scope.loginData);

        AuthFactory.login($scope.loginData);

        ngDialog.close();

    };

    $scope.openRegister = function () {
        ngDialog.open({ template: 'Views/LoginModal.html', scope: $scope, className: 'ngdialog-theme-default', controller: "RegisterController" });
    };

});