$(function() {
    $('#datepicker').datepicker({
      format: 'yyyy-mm-dd',
      orientation: "bottom left",
      startDate: new Date(),
      daysOfWeekDisabled: [0,6],
      todayHighlight: true,
      autoclose: true
    });
});

$(function() {
    $('#fecha_nacimiento').datepicker({
      format: 'yyyy-mm-dd',
      orientation: "bottom left",
      todayHighlight: true,
      autoclose: true
    });
});

$(function() {
    $('#fecha_contratacion').datepicker({
      format: 'yyyy-mm-dd',
      orientation: "bottom left",
      todayHighlight: true,
      autoclose: true
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
