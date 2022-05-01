const Reportes_mensuales = require('../models/reportes_mensuales');
const Empleado = require('../models/empleado');
const uploadImage = require('../helpers/helpers');

const real_meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function getAllDaysInMonth(year, month) {
  const date = new Date(year, month, 1);
  const dates = [];
  while (date.getMonth() === month) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return dates;
}

getLongMonthName = function(date) {
    return real_meses[date.getMonth()+1];
}

getShortMonthName = function(date) {
    return real_meses[date.getMonth()].substring(0, 3);
}

function getSemestralMonths(date){
  let months = [];
  if (date.endsWith("-01-01")){
    months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
  }
  else {
    months = ['Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  }
  return months;
}

function getArrayDateMonths(date, limit){
  let months = [];
  var dt = date;
  dt = new Date(dt);
  var month = new Date (dt.setMonth(dt.getMonth()));
  months.push(month);
  for (var i = 0; i < limit; i++) {
    var month = new Date (dt.setMonth(dt.getMonth()+1));
    months.push(month);
  }
  return months;
}

function getCoincidences(a, b){
  var coincidences = [];
  for (var i = 0; i < a.length; i++) {
      var numberOfCoincidences = 0;
      for (var j = 0; j < b.length; j++) {
        let prueba1 = a[i].toISOString().split('T')[0];
        let prueba2 = b[j].toISOString().split('T')[0];
          if (prueba1 == prueba2) {
              numberOfCoincidences += 1;
          }
      }
      coincidences.push(numberOfCoincidences);
  }
  return coincidences;
}


function getCoincidences2(a, b){
  var coincidences2 = [];
  for (var i = 0; i < a.length; i++) {
      var numberOfCoincidences2 = 0;
      for (var j = 0; j < b.length; j++) {
        let prueba1 = a[i].toISOString().slice(0,-17);
        //console.log(prueba1);
        let prueba2 = b[j].toISOString().slice(0,-17);
        //console.log(prueba2);
          if (prueba1 == prueba2) {
              numberOfCoincidences2 += 1;
          }
      }
      coincidences2.push(numberOfCoincidences2);
  }
  return coincidences2;
}


exports.get_reportes_mensuales = (request, response, next) => {
  const no_empleado = request.session.user_no_empleado;
  Empleado.getRol(no_empleado)
      .then(([rol, fieldData]) => {
      Reportes_mensuales.fetchAll()
      .then(([rows, fieldData]) => {
        console.log(rows);
        response.render('reportes_mensuales', {
            userRol: rol[0].id_rol,
            reportes_mensuales: rows,
            success: request.flash("success"),
            error: request.flash("error"),
            isLoggedIn: request.session.isLoggedIn === true ? true : false
          });
      }).catch(err => console.log(err));
  }).catch(err => console.log(err));
};

exports.post_delete_reportes_mensuales = (request, response, next) => {
    console.log('POST /reporte_mensual/delete/:id_reportes_mensuales');
    const id_reportes_mensuales = request.body.id_reportes_mensuales;

        Reportes_mensuales.deleteReportes(id_reportes_mensuales)
            .then(() => {
              console.log("Se elimino el reporte mensual");
              request.flash('success', 'El reporte mensual se eliminó con éxito');
              response.redirect('/reporte_mensual');
            }).catch(err => console.log(err));
    };

exports.post_reportes_mensuales = async (request, response, next) => {
    console.log('POST /reporte_mensual');
    const titulo_reporte_mensual = request.body.titulo_reporte_mensual;
    const descripcion_reporte_mensual = request.body.descripcion_reporte_mensual;
    const fecha_reporte_mensual = request.body.fecha_reporte_mensual;
    const filename = request.file;
    const imageUrl = await uploadImage(filename);

    console.log(titulo_reporte_mensual);
    console.log(descripcion_reporte_mensual);
    console.log(fecha_reporte_mensual);
    console.log(imageUrl);

    if (titulo_reporte_mensual.length == 0 && descripcion_reporte_mensual.length == 0 && fecha_reporte_mensual.length == 0 && !filename){
      request.flash('error', 'No se recibió ningún dato.');
      response.redirect('/dlc');
    }

    else if (titulo_reporte_mensual.length == 0 && descripcion_reporte_mensual.length == 0 && fecha_reporte_mensual.length == 0 && !filename){
      request.flash('error', 'Faltan datos por llenar.');
      response.redirect('/dlc');
    }

    else {
      const reportes_mensuales =
          new Reportes_mensuales(
            titulo_reporte_mensual,
            descripcion_reporte_mensual,
            fecha_reporte_mensual,
            imageUrl);
      reportes_mensuales.save()
      //
      .then(() => {
          console.log("Se guardo el reporte mensual");
          request.flash('success', 'El reporte ' + titulo_reporte_mensual + ' fue agregado con éxito');
          response.redirect('/reporte_mensual');
      })
      .catch(err => console.log(err));
    }

};

exports.filtrar_fecha = (request, response, next) => {
    const no_empleado = request.session.user_no_empleado;
    Empleado.getRol(no_empleado)
    .then(([rol, fieldData]) => {
        Reportes_mensuales.fetchSearch(request.params.fecha)
        .then(([rows, fieldData]) => {
          console.log(rows);
          response.render('reportes_mensuales', {
              userRol: rol[0].id_rol,
              reportes_mensuales: rows,
              success: request.flash("success"),
              error: request.flash("error"),
              isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};

exports.get_generar_reporte = (request, response, next) => {
    const no_empleado = request.session.user_no_empleado;
    const fecha_radio = request.params.fechaRadio;
    const fecha = request.params.fecha;
    const tabla = request.params.tabla;
    const estatus = request.params.estatus;

    switch (tabla) {
      case "vacaciones":
        var columna = "fecha_solicitud";
        var columna_estatus = "estatus_vacaciones";
        break;
      case "ng_block":
        var columna = "fecha_solicitud_ng_block";
        var columna_estatus = "estatus_ng_block";
        break;
    }

    Empleado.getRol (no_empleado)
    .then(([rol, fieldData]) => {
        if (fecha_radio.length == 0 && fecha.length == 0 && tabla.length == 0 && estatus.length == 0){
          request.flash('error', 'No se recibió ningún dato.');
          response.redirect('/reporte_mensual');
        }

        else if (fecha_radio.length == 0 || fecha.length == 0 || tabla.length == 0 || estatus.length == 0){
          request.flash('error', 'Faltan datos por llenar.');

        }

        else {
          switch (fecha_radio) {
            //Mensual
            case "radio1":
                Reportes_mensuales.generarReporteMensual(columna, columna_estatus, tabla, fecha, estatus)
                .then(([rows, fieldData]) => {
                  var dt = fecha;
                  dt = new Date(dt);
                  daysInMonth = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();
                  let days = [];
                  for (let i = 1; i <= daysInMonth; i++){
                    days.push(i);
                  }
                  let dates= [];
                  for (let data of rows){
                      dates.push(data.fecha);
                  }
                  var dt = new Date();
                  var month = dt.getMonth();
                  var year = dt.getFullYear();
                  daysInMonth = new Date(year, month, 0).getDate();

                  let a = getAllDaysInMonth(year, month);

                  let coincidences = [];
                  let xLabel = "Días del mes de " + getLongMonthName(new Date(fecha));
                  let tittle = "Solicitudes de " + tabla + " de " + getLongMonthName(new Date(fecha)) + " con estatus " + estatus;
                  coincidences = getCoincidences(a, dates);

                  response.render('generar_reporte', {
                      userRol: rol[0].id_rol,
                      data: coincidences,
                      tabla: tabla,
                      estatus: estatus,
                      xLabel: xLabel,
                      tittle: tittle,
                      days: days,
                      isLoggedIn: request.session.isLoggedIn === true ? true : false
                    });
                }).catch(err => console.log(err));
              break;

            //Semestral
            case "radio2":
                Reportes_mensuales.generarReporteSemestral(columna, columna_estatus, tabla, fecha, estatus)
                .then(([rows, fieldData]) => {
                  let months = getSemestralMonths(fecha);
                  let arrayMonths = getArrayDateMonths(fecha, 5);
                  let dates= [];
                  for (let data of rows){
                      dates.push(data.fecha);
                  }
                  let coincidences2 = [];
                  let xLabel = "Meses del año " + fecha.slice(0,-6);
                  let tittle = "Solicitudes de " + tabla + " de " + fecha.slice(0,-6) + " con estatus " + estatus;
                  coincidences2 = getCoincidences2(arrayMonths, dates);
                  response.render('generar_reporte', {
                      userRol: rol[0].id_rol,
                      data: coincidences2,
                      tabla: tabla,
                      estatus: estatus,
                      tittle: tittle,
                      xLabel: xLabel,
                      days: months,
                      isLoggedIn: request.session.isLoggedIn === true ? true : false
                    });
                }).catch(err => console.log(err));
              break;

            //Anual
            case "radio3":
                Reportes_mensuales.generarReporteMensual(columna, columna_estatus, tabla, fecha, estatus)
                .then(([rows, fieldData]) => {

                  let arrayMonths = getArrayDateMonths(fecha, 11);
                  let dates= [];
                  for (let data of rows){
                      dates.push(data.fecha);
                  }
                  let coincidences2 = [];
                  coincidences2 = getCoincidences2(arrayMonths, dates);
                  let xLabel = "Meses del año " + fecha;
                  let tittle = "Solicitudes de " + tabla + " de " + fecha + " con estatus " + estatus;
                  response.render('generar_reporte', {
                      userRol: rol[0].id_rol,
                      data: coincidences2,
                      tabla: tabla,
                      estatus: estatus,
                      tittle: tittle,
                      xLabel: xLabel,
                      days: real_meses,
                      isLoggedIn: request.session.isLoggedIn === true ? true : false
                    });
                }).catch(err => console.log(err));
              break;
          }
        }
    }).catch(err => console.log(err));
};
