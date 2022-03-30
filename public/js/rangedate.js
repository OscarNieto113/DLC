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

    $('#fecha_primer_dia').on("changeDate", function () {
        var the_dates = $('#fecha_primer_dia').datepicker('getDates');
        the_dates.sort();
        //funcion que ordene arreglo
        var p_dia = the_dates[0];
        //alguna madre que nos permita apuntar al ultimo día
        var u_dia = the_dates[the_dates.length-1];
        //pa el total de días seleccionados
        var longitud = the_dates.length;
        //this does not work
       console.log(the_dates);
       console.log(p_dia);
       console.log(u_dia);
       console.log(the_dates.length);
    });


});
