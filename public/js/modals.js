$.clearInput = function () {
        $('vehicle-form').find('input[type=text], input[type=password], input[type=number], input[type=email], textarea').val('');
};

$('#exampleModal3').on('hide.bs.modal', function () {
        $.clearInput();
});
