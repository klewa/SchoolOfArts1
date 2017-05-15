schoolApp.filter('ProfessorOrNot', function () {
    return function (input) {
        return input ? 'Docente' : 'Não Docente';
    }
});