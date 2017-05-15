'use strict';

schoolApp.controller('HeaderController', function ($scope, $rootScope, ngDialog, AuthFactory, $window) {

    $scope.loggedIn = false;
    $scope.username = '';
    $scope.isAdmin = false;

    if (AuthFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthFactory.getUsername();
        $scope.isAdmin = AuthFactory.isAdmin();
    }

    $scope.openLogin = function () {
        ngDialog.open({ template: 'Views/LoginModal.html', scope: $scope, className: 'ngdialog-theme-default', controller: "LoginController" });
        
    };

    $scope.logOut = function () {
        AuthFactory.logout();
        $scope.loggedIn = false;
        $scope.username = '';
        $scope.isAdmin = false;
        $window.location.href = '/';
    };

    $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
        $scope.isAdmin = AuthFactory.isAdmin();
    });

    $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
        $scope.isAdmin = AuthFactory.isAdmin();
    });

    $scope.stateis = function (curstate) {
        return $state.is(curstate);
    };
});