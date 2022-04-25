const Reportes_mensuales = require('../models/reportes_mensuales');
const Empleado = require('../models/empleado');

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

exports.post_reportes_mensuales = (request, response, next) => {
    console.log('POST /reporte_mensual');
    const titulo_reporte_mensual = request.body.titulo_reporte_mensual;
    const descripcion_reporte_mensual = request.body.descripcion_reporte_mensual;
    const fecha_reporte_mensual = request.body.fecha_reporte_mensual;
    const filename = request.file.filename;

    console.log(titulo_reporte_mensual);
    console.log(descripcion_reporte_mensual);
    console.log(fecha_reporte_mensual);
    console.log(filename);

    if (titulo_reporte_mensual.length == 0 && descripcion_reporte_mensual.length == 0 && fecha_reporte_mensual.length == 0 && filename.length == undefined){
      request.flash('error', 'No se recibió ningún dato.');
      response.redirect('/dlc');
    }

    else if (titulo_reporte_mensual.length == 0 && descripcion_reporte_mensual.length == 0 && fecha_reporte_mensual.length == 0 && filename.length == undefined){
      request.flash('error', 'Faltan datos por llenar.');
      response.redirect('/dlc');
    }

    else {
      const reportes_mensuales =
          new Reportes_mensuales(
            titulo_reporte_mensual,
            descripcion_reporte_mensual,
            fecha_reporte_mensual,
            filename);
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

exports.get_generar_reporte = async(request, response, next) => {
    const no_empleado = request.session.user_no_empleado;
    const titulo_reporte = request.params.titulo;
    const fecha_radio = request.params.fechaRadio;
    const fecha = request.params.fecha;
    const tabla = request.params.tabla;
    const estatus = request.params.estatus;

    //console.log(titulo_reporte);
    //console.log(fecha_radio);
    //console.log(fecha);
    //console.log(tabla);
    //console.log(estatus);

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
        if (titulo_reporte.length == 0 && fecha_radio.length == 0 && fecha.length == 0 && tabla.length == 0 && estatus.length == 0){
          request.flash('error', 'No se recibió ningún dato.');
          response.redirect('/reporte_mensual');
        }

        else if (titulo_reporte.length == 0 || fecha_radio.length == 0 || fecha.length == 0 || tabla.length == 0 || estatus.length == 0){
          request.flash('error', 'Faltan datos por llenar.');
          response.redirect('/reporte_mensual');
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
                  console.log(titulo_reporte);
                  response.render('generar_reporte', {
                      userRol: rol[0].id_rol,
                      data: dates,
                      days: days,
                      titulo: titulo_reporte,
                      isLoggedIn: request.session.isLoggedIn === true ? true : false
                    });
                }).catch(err => console.log(err));
              break;

            //Semestral
            case "radio2":
                Reportes_mensuales.generarReporteSemestral(columna, columna_estatus, tabla, fecha, estatus)
                .then(([rows, fieldData]) => {
                  console.log(rows);
                  response.render('generar_reporte', {
                      userRol: rol[0].id_rol,
                      data: rows,
                      titulo: titulo_reporte,
                      isLoggedIn: request.session.isLoggedIn === true ? true : false
                    });
                }).catch(err => console.log(err));
              break;

            //Anual
            case "radio3":
                Reportes_mensuales.generarReporteAnual(columna, columna_estatus, tabla, fecha, estatus)
                .then(([rows, fieldData]) => {
                  console.log(rows);
                  response.render('generar_reporte', {
                      userRol: rol[0].id_rol,
                      data: rows,
                      titulo: titulo_reporte,
                      isLoggedIn: request.session.isLoggedIn === true ? true : false
                    });
                }).catch(err => console.log(err));
              break;
          }
        }
    }).catch(err => console.log(err));
};
