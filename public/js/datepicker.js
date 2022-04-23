$(document).ready(function(){
     $.fn.datepicker.defaults.language = 'es';
});

$(document).ready(function(){
    $('#fecha_ng').datepicker({
      format: 'dd/mm/yyyy',
      orientation: "bottom left",
      daysOfWeekDisabled: [0,6],
      todayHighlight: true,
      autoclose: true
    });

    $('#fecha_ng').on("changeDate", function ng_block () {
      var f1 = $('#fecha_ng').datepicker('getDate');
      console.log(f1)
      document.getElementById("fecha_uso_ng_block").value = f1.toISOString().split('T')[0];
  });
});

$(document).ready(function(){
    $('#fecha_n').datepicker({
      format: 'dd/mm/yyyy',
      orientation: "bottom left",
      todayHighlight: true,
      autoclose: true,
      endDate: new Date()
    });

    $('#fecha_n').on("changeDate", function ng_block () {
      var f2 = $('#fecha_n').datepicker('getDate');
      console.log(f2)
      document.getElementById("fecha_nacimiento").value = f2.toISOString().split('T')[0];
  });
});

$(document).ready(function(){
    $('#fecha_c').datepicker({
      format: 'dd/mm/yyyy',
      orientation: "bottom left",
      todayHighlight: true,
      autoclose: true,
      endDate: new Date()
    });

    $('#fecha_c').on("changeDate", function ng_block () {
      var f3 = $('#fecha_c').datepicker('getDate');
      console.log(f3)
      document.getElementById("fecha_contratacion").value = f3.toISOString().split('T')[0];
  });
});


$(document).ready(function(){
    $('#fecha_reporte_m').datepicker({
      format: 'dd/mm/yyyy',
      orientation: "bottom left",
      startView: "months",
      minViewMode: "months",
      todayHighlight: true,
      autoclose: true
    });

    $('#fecha_reporte_m').on("changeDate", function ng_block () {
      var f1 = $('#fecha_reporte_m').datepicker('getDate');
      console.log(f1)
      document.getElementById("fecha_reporte_mensual").value = f1.toISOString().split('T')[0];
  });
});

/*
  var currentDate  = new Date(),
      currentDay   = currentDate.getDate() < 10
                   ? '0' + currentDate.getDate()
                   : currentDate.getDate(),
      currentMonth = currentDate.getMonth() < 9
                   ? '0' + (currentDate.getMonth() + 1)
                   : (currentDate.getMonth() + 1);
    document.getElementById("date").innerHTML = currentDay + '-' + currentMonth + '-' + currentDate.getFullYear();*/

//var current = new Date();
//var current2 = current.toLocaleDateString("en-AU");
//document.getElementById("date").innerHTML= current2//.toISOString().split('T')[0];
