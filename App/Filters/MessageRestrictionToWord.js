schoolApp.filter('MessageRestrictionToWord', function () {

    return function (value) {

        return "Anúncio " + value ? "Público" : "Restrito";
    }
});