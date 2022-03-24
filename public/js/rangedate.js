$(document).ready(function(){
  var date_input=$('input[name="primer_dia"]');
  var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
  var options={
    multidate:true,
    format: 'yyyy-mm-dd',
    container: container,
    todayHighlight: true,
    autoclose: false,
    daysOfWeekDisabled: [0,6],
    startDate: new Date(),
    orientation: "bottom center"
    };
    date_input.datepicker(options);
});
