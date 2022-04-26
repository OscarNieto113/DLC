  $(document).ready(function () {
      $('#all_dates').datepicker({
        multidate: true,
        format: 'dd-mm-yyyy',
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
          var p_dia = sorted_dates[0];
          //console.log(the_dates);
          document.getElementById("fecha_primer_dia").value = p_dia.toISOString().split('T')[0];
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
          document.getElementById("fecha_ultimo_dia").value = u_dia.toISOString().split('T')[0];
      });

      //funcion pa la cantidad de dias
      $('#all_dates').on("changeDate", function cantidad_dias() {
          var the_dates = $('#all_dates').datepicker('getDates');
          sorted_dates = the_dates.sort(
            (dateA, dateB) => new Date(dateA)- new Date(dateB)
          );
          var longitud = sorted_dates.length

          document.getElementById("dias_solicitados").value = longitud;
      });

      //primer dia alert
      $('#all_dates').on("changeDate", function primer_dia () {
          var the_dates = $('#all_dates').datepicker('getDates');
          sorted_dates = the_dates.sort(
            (dateA, dateB) => new Date(dateA)- new Date(dateB)
          );
          //funcion que ordene arreglo
          var pr_dia = sorted_dates[0];
          var options = {
                year: "numeric",
                month: "2-digit",
                day: "numeric"
            };
          var pr_dia2 = pr_dia.toLocaleDateString(undefined, options);
          //console.log(pr_dia2)
          document.getElementById("fecha_p2").value = pr_dia2;
      });

      //ultimo dia alert
      $('#all_dates').on("changeDate", function primer_dia () {
          var the_dates = $('#all_dates').datepicker('getDates');
          sorted_dates = the_dates.sort(
            (dateA, dateB) => new Date(dateA)- new Date(dateB)
          );
          //funcion que ordene arreglo
          var ul_dia = sorted_dates[sorted_dates.length-1];
          var options = {
                year: "numeric",
                month: "2-digit",
                day: "numeric"
            };
          var ul_dia2 = ul_dia.toLocaleDateString(undefined, options);
          //console.log(ul_dia2)
          document.getElementById("fecha_u2").value = ul_dia2;
      });


  });
