schoolApp.filter('employeeSexToWords', function () {

    return function (value) {

        if (value == "H") return "Homem";
        if (value == "M") return "Mulher";
        return "";
    }
});