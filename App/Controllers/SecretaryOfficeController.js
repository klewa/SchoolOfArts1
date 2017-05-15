schoolApp.controller('secretaryOfficeController', function ($scope, $document, OfficeHour, Message, MessageBox, $sessionStorage, Utility) {

    OfficeHour.getByType("CLASSES").then(function (hours) {
        $scope.ClassesHours = hours;
    }
   , function (error) {

       $scope.status = 'Unable to load Contact data: ' + error.message;
   });

    OfficeHour.getByType("OFFICE").then(function (hours) {
        $scope.SecretaryOfficeHours = hours;
    }
   , function (error) {

       $scope.status = 'Unable to load Contact data: ' + error.message;
   });

    Message.getByParameters(false, "PUBLIC").then(function (messages) {
        $scope.Messages = messages;

        var date = new Date();
        date.setDate(date.getDate() - 7);
        var filtered = $scope.Messages.filter(function (value) {
            return new Date(value.PublicationDate).withoutTime() >= date.withoutTime();
        });

        if (filtered.length > 0 && !$sessionStorage.get("MessagesWarningShown", false)){
            
            if (filtered.length == 1)
                MessageBox.Show("Atenção: há um novo anúncio publicado durante esta semana.");
            else
                MessageBox.Show("Atenção: há " + filtered.length + " novos anúncios publicados durante esta semana.");

            $sessionStorage.store("MessagesWarningShown", true);
        }
    }
   , function (error) {

       $scope.status = 'Unable to load Contact data: ' + error.message;
   });

    $scope.toTheTop = function () {
        $document.scrollTopAnimated(0, 5000).then(function () {
            console && console.log('You just scrolled to the top!');
        });
    }
    $scope.gotoElement = function (elementId) {
        var section = angular.element(document.getElementById(elementId));
        $document.scrollToElementAnimated(section);
    };

    $scope.currentLimit = 3;
    var increaseLimitValue = 3;
    $scope.increaseDisplayLimit = function () {
        $scope.currentLimit += increaseLimitValue;
        
    }

    $scope.hasMoreEvents = function () {
        if ($scope.Messages)
            return $scope.Messages.length > $scope.currentLimit;

        return false;
    }

    Utility.scrollDown();

    
}).value('duScrollOffset', 30);;