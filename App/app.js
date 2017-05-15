// create the module and name it scotchApp
var schoolApp = angular.module('schoolApp', ['ui.bootstrap', 'ngRoute', 'duScroll', 'ngResource', 'ngFileUpload', 'ngNotify', 'ngDialog', 'ngAnimate', 'ngSanitize'])
//.constant("baseURL", "http://localhost:3000/api")
//.constant("picturesUploadUrl", "http://localhost:3000/api/Attachments/pictures/upload")
//.constant("pdfsUploadUrl", "http://localhost:3000/api/Attachments/pdfs/upload")
//.constant("pdfsDownloadUrl", "http://localhost:3000/api/Attachments/pdfs/download")
//.constant("picturesDownloadUrl", "http://localhost:3000/api/Attachments/pictures/download")
//.constant("urlBase", "http://localhost:3000/api/");
.constant("baseURL", "http://schoolofarts.mybluemix.net/api")
.constant("picturesUploadUrl", "http://schoolofarts.mybluemix.net/api/Attachments/pictures/upload")
.constant("pdfsUploadUrl", "http://schoolofarts.mybluemix.net/api/Attachments/pdfs/upload")
.constant("pdfsDownloadUrl", "http://schoolofarts.mybluemix.net/api/Attachments/pdfs/download")
.constant("picturesDownloadUrl", "http://schoolofarts.mybluemix.net/api/Attachments/pictures/download")
.constant("urlBase", "http://schoolofarts.mybluemix.net/api/");

// configure our routes
schoolApp.config(function ($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl: 'Views/School.html',
            controller: 'homeController'
        })

        // route for the about page
        .when('/SecretaryOffice', {
            templateUrl: 'Views/SecretaryOffice.html',
            controller: 'secretaryOfficeController'
        })

        // route for the contact page
        .when('/Information', {
            templateUrl: 'Views/Information.html',
            controller: 'informationCoursesController'
        })

        // route for the contact page
        .when('/Staff', {
            templateUrl: 'Views/Staff.html',
            controller: 'staffController'
        })
    .when('/Documents', {
        templateUrl: 'Views/Documents.html',
        controller: 'documentsController'
    })

    // route for the contact page
    .when('/Music', {
        templateUrl: 'Views/Music.html',
        controller: 'musicController'
    })

    // route for the contact page
    .when('/Dance', {
        templateUrl: 'Views/Dance.html',
        controller: 'danceController'
    })

    // route for the contact page
    .when('/OtherActivities', {
        templateUrl: 'Views/OtherActivities.html',
        controller: 'otherActivitiesController'
    })

    // route for the contact page
    .when('/Events', {
        templateUrl: 'Views/Events.html',
        controller: 'eventsController'
    })

    .when('/Dashboard', {
        templateUrl: 'Views/Dashboard.html',
        controller: 'dashboardController'
    })

    .when('/ForStudents', {
        templateUrl: 'Views/InternalFilesForStudents.html',
        controller: 'forStudentsSectionController'
    })

    .when('/ForProfessors', {
        templateUrl: 'Views/InternalFilesForProfessors.html',
        controller: 'forProfessorsSectionController'
    })

        .when('/InformationDetail/:keyID', {
            templateUrl: 'Views/InformationDetail.html',
            controller: 'informationDetailController'
        })

        .when('/EventDetail/:keyID', {
            templateUrl: 'Views/EventDetail.html',
            controller: 'eventDetailController'
        })

    .otherwise({ redirectTo: '/' });

}).run(function ($rootScope, $location, AuthFactory)
{
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if (next.originalPath == "/Dashboard" && !AuthFactory.isAdmin()) {
            $location.path("/");
        }

    })
});

