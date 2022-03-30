$(document).ready(function () {
    $('#fecha_primer_dia').datepicker({
      multidate: true,
      format: 'yyyy-mm-dd',
      container: $('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body",
      todayHighlight: true,
      autoclose: false,
      daysOfWeekDisabled: [0,6],
      startDate: new Date(),
      orientation: "bottom center",
    });

    //Funcion pa el primer dia
    $('#fecha_primer_dia').on("changeDate", function () {
        var the_dates = $('#fecha_primer_dia').datepicker('getDates');
        sorted_dates = the_dates.sort(
          (dateA, dateB) => new Date(dateA)- new Date(dateB)
        );
        console.log(sorted_dates);
        //funcion que ordene arreglo
        var p_dia = sorted_dates[0];
        console.log(p_dia);
    });

    //funcion pa el ultimo dia
    $('#fecha_primer_dia').on("changeDate", function () {
        var the_dates = $('#fecha_primer_dia').datepicker('getDates');
        sorted_dates = the_dates.sort(
          (dateA, dateB) => new Date(dateA)- new Date(dateB)
        );
        console.log(sorted_dates);
        //alguna madre que nos permita apuntar al ultimo día
        var u_dia = sorted_dates[sorted_dates.length-1];
        console.log(u_dia);
    });

    //funcion pa la cantidad de dias
    $('#fecha_primer_dia').on("changeDate", function () {
        var the_dates = $('#fecha_primer_dia').datepicker('getDates');
        sorted_dates = the_dates.sort(
          (dateA, dateB) => new Date(dateA)- new Date(dateB)
        );
        console.log(sorted_dates);
        var longitud = sorted_dates.length;
        console.log(longitud);
        //this does not work
    });


});
