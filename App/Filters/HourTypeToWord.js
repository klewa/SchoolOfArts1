schoolApp.filter('HourTypeToWord', function () {

    return function (value) {

        return value ? "Secretaria" : "Aulas";
    }
});