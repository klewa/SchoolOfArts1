schoolApp.controller('eventsController', function ($scope, $document, Event, picturesDownloadUrl, $sessionStorage, MessageBox, Utility) {

    $scope.picturesDownloadUrl = picturesDownloadUrl;
    $scope.Events = [];
    Event.getAll().then(function (events) {
        $scope.Events = events;

        var date = new Date();
        //date.setDate(date.getDate() + 7);
        var filtered = $scope.Events.filter(function (value) {
            return new Date(value.Date).withoutTime() >= date.withoutTime();
        });

        if (filtered.length > 0 && !$sessionStorage.get("EventsWarningShown", false)) {

            if (filtered.length == 1)
                MessageBox.Show("Atenção: há um evento a acontecer brevemente.");
            else
                MessageBox.Show("Atenção: há " + filtered.length + " eventos a acontecer brevemente.");

            $sessionStorage.store("EventsWarningShown", true);
        }
    }
    , function (error) {

        $scope.status = 'Unable to load Contact data: ' + error.message;
    });

    $scope.currentLimit = 3;
    var increaseLimitValue = 3;
    $scope.increaseDisplayLimit = function ()
    {
        $scope.currentLimit += increaseLimitValue;
    }

    $scope.hasMoreEvents = function ()
    {
        return $scope.Events.length > $scope.currentLimit;
    }

    $scope.toTheTop = function () {
        $document.scrollTopAnimated(0, 5000).then(function () {
        })
    };

    Utility.scrollDown();
});