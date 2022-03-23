exports.get_s_ng_block = (request, response, next) => {
    console.log('GET /dlc/s_ng_block');
    response.render('s_ng_block', {
      //
              username: request.session.username ? request.session.username : '',
              info: ''
          });
      };
//

exports.post_s_ng_block = (request, response, next) => {
    console.log('POST /dlc/s_ng_block');
    console.log(request.body);
    const ng_block =
        new Ng_Block(
          request.body.id_ng_block,
          request.body.turno_ng_block,
          request.body.descripcion_ng_block,
          request.body.fecha_uso_ng_block,
          request.body.fecha_solicitud_ng_block,
          request.body.estatus_ng_block,
          request.body.no_empleado);
    ng_block.save()
      .then(() => {
          request.session.info = 'El NG Block con fecha de uso de '+ ng_block.fecha_uso_ng_block + ' fue agregado con éxito';
          response.setHeader('Set-Cookie', 'ultimo_ng_block='+ng_block.fecha_uso_ng_block+'; HttpOnly');

          response.redirect('/capybaras');
      })
      .catch(err => console.log(err));
};
