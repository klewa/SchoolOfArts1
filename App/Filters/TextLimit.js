schoolApp.filter('textLimit', function ()
{

    return function (value, limit) {
        if (value == undefined)
            return "";

        if (limit == undefined)
            return value;

        if (value.length < limit)
            return value;

        return value.substring(0, limit) + "...";
    }
});