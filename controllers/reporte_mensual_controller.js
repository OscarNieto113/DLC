const Reportes_mensuales = require('../models/reportes_mensuales');

exports.post_reportes_mensuales = (request, response, next) => {
    console.log(request.body);
    console.log(request.file);
    const reportes_mensuales =
        new Reportes_mensuales(
          request.body.titulo_reporte_mensual,
          request.body.descripcion_reporte_mensual,
          request.body.fecha_reporte_mensual,
          request.file.filename);
    reportes_mensuales.save()
    //
    .then(() => {
        response.redirect('/dlc/reportes_mensuales');
    })
    .catch(err => console.log(err));
};

exports.get_reportes_mensuales = (request, response, next) => {
    Reportes_mensuales.fetchAll()
    .then(([rows, fieldData]) => {
      console.log(rows);
      response.render('reportes_mensuales', {
          reportes_mensuales: rows
      });
  })
  .catch(err => {
      console.log(err);
  });
};
