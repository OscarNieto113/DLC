  $(document).ready(function () {
      $('#all_dates').datepicker({
        format: 'dd-mm-yyyy',
        multidate: true,
        locale: 'es-es',
        container: $('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body",
        todayHighlight: true,
        autoclose: false,
        daysOfWeekDisabled: [0,6],
        startDate: new Date(),
        orientation: "bottom center",
      });

      //Funcion pa el primer dia
      $('#all_dates').on("changeDate", function primer_dia () {
          var the_dates = $('#all_dates').datepicker('getDates');
          sorted_dates = the_dates.sort(
            (dateA, dateB) => new Date(dateA)- new Date(dateB)
          );
          //funcion que ordene arreglo
          var u_dia = sorted_dates[0];
          //var p_dia2 = document.getElementById("p_dia");//.value = longitud;
          //p_dia2.innerHTML = p_dia;
          console.log(u_dia)
          document.getElementById("fecha_primer_dia").value = u_dia.toISOString().split('T')[0];
      });

      //funcion pa el ultimo dia
      $('#all_dates').on("changeDate", function ultimo_dia () {
          var the_dates = $('#all_dates').datepicker('getDates');
          sorted_dates = the_dates.sort(
            (dateA, dateB) => new Date(dateA)- new Date(dateB)
          );
          //alguna madre que nos permita apuntar al ultimo día
          var u_dia = sorted_dates[sorted_dates.length-1];
          var date = u_dia;
          //console.log(date.setDate(date.getDate() + 1))
          console.log(u_dia)
          document.getElementById("fecha_ultimo_dia").value = u_dia.toISOString().split('T')[0];
      });

      //funcion pa la cantidad de dias
      $('#all_dates').on("changeDate", function cantidad_dias() {
          var the_dates = $('#all_dates').datepicker('getDates');
          sorted_dates = the_dates.sort(
            (dateA, dateB) => new Date(dateA)- new Date(dateB)
          );
          var longitud = sorted_dates.length
          console.log(longitud)
          document.getElementById("dias_solicitados").value = longitud;
      });

  });
