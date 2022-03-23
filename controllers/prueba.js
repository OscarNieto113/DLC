exports.listar = (request, response, next) => {
    console.log('Ruta /dlc');
    //
    console.log(request.cookies);
    const info = request.session.info ? request.session.info : '';
    request.session.info = '';
    Noticia.fetchAll()
      .then(([rows, fieldData]) => {
        console.log(rows); //Prueba
        Publicacion.fetchAll()
        .then(([rows, fieldData]) => {
          console.log(rows); //Prueba
          response.render('main', {
            publicacion: rows,
            noticia: rows,
            username: request.session.username ? request.session.username : '',
            ultimo_ng_block: request.cookies.ultimo_ng_block ? request.cookies.ultimo_ng_block : '',
            info: info //El primer info es la variable del template, el segundo la constante creada arriba
          });
      })
      .catch(err => {
          console.log(err);
      });
    })
    .catch(err => {
        console.log(err);
    });

}

exports.post_s_vacaciones = (request, response, next) => {
    console.log('POST /dlc/s_vacaciones');
    console.log(request.body);
    const vacaciones =
        new Vacaciones(
          request.body.folio,
          request.body.no_empleado,
          request.body.responsable_ausencia,
          request.body.observaciones,
          request.body.reanudacion_labores,
          request.body.primer_dia,
          request.body.ultimo_dia,
          request.body.fecha_solicitud,
          request.body.dias_solicitados,
          request.body.estatus_vacaciones);
    vacaciones.save()
    .then(() => {
        request.session.info = 'Las vacaciones con fecha de uso de '+ vacaciones.primer_dia + ' fue agregado con éxito';
        response.setHeader('Set-Cookie', 'ultimo_ng_block='+vacaciones.primer_dia+'; HttpOnly');

        response.redirect('/capybaras');
    })
    .catch(err => console.log(err));
};
