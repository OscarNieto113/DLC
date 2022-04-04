function addRows(){
  var table = document.getElementById('vacaciones_totalesbl');
  var rowCount = table.rows.length;
  var cellCount = ((table.rows[0].cells.length)-1);
  var row = table.insertRow(rowCount);
  for(var i =0; i <= cellCount; i++){
    var cell = 'cell'+i;
    cell = row.insertCell(i);
    var copycel = document.getElementById('col1').innerHTML;
    cell.innerHTML=copycel;
  }
}

function deleteRows(){
var table = document.getElementById('vacaciones_totalesbl');
var rowCount = table.rows.length;
if(rowCount > '2'){
  var row = table.deleteRow(rowCount-1);
  rowCount--;
}
else{
  alert('There should be atleast one row');
}
}
