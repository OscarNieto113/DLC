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

exports.get_generar_reporte = (request, response, next) => {
    const no_empleado = request.session.user_no_empleado;
    const titulo_reporte = request.params.titulo;
    Empleado.getRol(no_empleado)
    .then(([rol, fieldData]) => {




        Reportes_mensuales.fetchSearch(request.params.fecha)
        .then(([rows, fieldData]) => {
          console.log(rows);
          response.render('generar_reporte', {
              userRol: rol[0].id_rol,
              reportes_mensuales: rows,
              success: request.flash("success"),
              error: request.flash("error"),
              isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};
