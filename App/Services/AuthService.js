'use strict';

schoolApp.factory("AuthFactory", function ($resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog, urlBase) {
    var authFac = {};
    var TOKEN_KEY = 'Token';
    var isAuthenticated = false;
    var username = '';
    var authToken = undefined;


    function loadUserCredentials() {
        var credentials = $localStorage.getObject(TOKEN_KEY, '{}');
        if (credentials.username != undefined) {
            useCredentials(credentials);
        }
    }

    function storeUserCredentials(credentials) {
        $localStorage.storeObject(TOKEN_KEY, credentials);
        useCredentials(credentials);
    }

    function useCredentials(credentials) {
        isAuthenticated = true;
        username = credentials.username;
        authToken = credentials.token;

        // Set the token as header for your requests!
        $http.defaults.headers.common['x-access-token'] = authToken;
    }

    function destroyUserCredentials() {
        authToken = undefined;
        username = '';
        isAuthenticated = false;
        $http.defaults.headers.common['x-access-token'] = authToken;
        $localStorage.remove(TOKEN_KEY);
    }

    authFac.login = function (loginData) {

        var urlSpecific = '/SchoolUsers/login';
        $resource(baseURL + urlSpecific)
        .save(loginData,
           function (response) {
               storeUserCredentials({ username: loginData.username, token: response.id });
               $rootScope.$broadcast('login:Successful');
           },
           function (response) {
               isAuthenticated = false;
               var message = "";

               if (response.data && response.data.err) {
                   message = '\
                <div class="ngdialog-message">\
                <div><h3>Login falhou.</h3></div>' +
                 '<div><p>' + response.data.err.message + '</p><p>' +
                         response.data.err.name + '</p></div>' +

                      '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>\
                </div>'
               }
               else
               {
                   var errorMessage = "";
                   switch (response.status)
                   {
                       case 0:
                           errorMessage = "Problem de comunicação";
                           break;
                       case 401:
                           errorMessage = "Utilizador ou /e palavra passe incorreto(s)";
                           break;
                       default:
                           errorMessage = 'Response status: ' + response.status;
                   }
                   message = '\
                <div class="ngdialog-message">\
                <div><h3>Login falhou.</h3></div>' +
                       '<div><p> ' + errorMessage + '</p><p>'
                   '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>\
                </div>'
               }
               ngDialog.openConfirm({ template: message, plain: 'true' });
           }

        );

    };

    authFac.logout = function () {
        var urlSpecific = '/SchoolUsers/logout';
        $resource(baseURL + urlSpecific).get(function (response) {

        });
        destroyUserCredentials();
    };

    authFac.register = function (registerData) {

        $resource(baseURL + "users/register")
        .save(registerData,
           function (response) {
               authFac.login({ username: registerData.username, password: registerData.password });
               if (registerData.rememberMe) {
                   $localStorage.storeObject('userinfo',
                       { username: registerData.username, password: registerData.password });
               }

               $rootScope.$broadcast('registration:Successful');
           },
           function (response) {

               var message = '\
                <div class="ngdialog-message">\
                <div><h3>Registration Unsuccessful</h3></div>' +
                   '<div><p>' + response.data.err.message +
                   '</p><p>' + response.data.err.name + '</p></div>';

               ngDialog.openConfirm({ template: message, plain: 'true' });

           }

        );
    };

    authFac.isAuthenticated = function () {
        return isAuthenticated;
    };

    authFac.getUsername = function () {
        return username;
    };

    authFac.isAdmin = function () {
        return isAuthenticated && username === "Admin";
    };

    loadUserCredentials();

    return authFac;
});