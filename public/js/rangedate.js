$(document).ready(function(){
  var date_input=$('input[name="myrosterdate"]'); //our date input has the name "myrosterdate"
  var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
  var options={
    multidate:true,
    format: 'yyyy-mm-dd',
    container: container,
    todayHighlight: true,
    autoclose: false,
    daysOfWeekDisabled: [0,6],
    orientation: "bottom center"
    };
    date_input.datepicker(options);
});
