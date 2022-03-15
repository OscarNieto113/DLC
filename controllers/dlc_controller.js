const path = require('path');
const Area = require('../models/area');
const Empleado_area = require('../models/empleado_area');
const Empleado = require('../models/empleado');
const Ng_Block = require('../models/ng_block');
const Noticia = require('../models/noticia');
const Objetivo = require('../models/objetivo');
const Permiso_informal = require('../models/permiso_informal');
const Prestaciones = require('../models/prestaciones');
const Publicacion = require('../models/publicacion');
const Referidos = require('../models/referidos');
const Vacaciones = require('../models/vacaciones');

//------------------------Solicitar NG Block--------------------------------
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
        new Ng_Block(request.body.id_ng_block, request.body.turno_ng_block, request.body.descripcion_ng_block, request.body.fecha_uso_ng_block, request.body.fecha_solicitud_ng_block, request.body.estatus_ng_block, request.body.no_empleado);
    ng_block.save();
    //
    request.session.info = 'El NG Block con fecha de uso de '+ ng_block.fecha_uso_ng_block + ' fue agregado con éxito';
    response.setHeader('Set-Cookie', 'ultimo_ng_block='+ng_block.fecha_uso_ng_block+'; HttpOnly');
    response.redirect('/dlc');
};
//

//------------------------Solicitar NG Block--------------------------------

//------------------------Aprobar NG Block--------------------------------
exports.get_a_ng_block = (request, response, next) => {
    console.log('GET /dlc/a_ng_block');
    response.render('a_ng_block', {ng_block: Ng_Block.fetchAll()});
};

exports.post_a_ng_block = (request, response, next) => {
    console.log('POST /dlc/s_ng_block');
    console.log(request.body);
    const ng_block =
        new Ng_Block(request.body.estatus_ng_block);
    ng_block.save();
    response.redirect('/dlc');
};
//------------------------Aprobar NG Block--------------------------------


//------------------------Solicitar Vacaciones--------------------------------
exports.get_s_vacaciones = (request, response, next) => {
    console.log('GET /dlc/s_vacaciones');
    response.render('s_vacaciones');
};

exports.post_s_vacaciones = (request, response, next) => {
    console.log('POST /dlc/s_vacaciones');
    console.log(request.body);
    const vacaciones =
        new Vacaciones(request.body.folio, request.body.responsable_ausencia, request.body.reanudacion_labores, request.body.primer_dia, request.body.ultimo_dia, request.body.fecha_solicitud, request.body.no_empleado);
    vacaciones.save();
    response.redirect('/dlc');
};
//------------------------Solicitar Vacaciones--------------------------------

//------------------------Aprobar Vacaciones--------------------------------
exports.get_a_vacaciones = (request, response, next) => {
    console.log('GET /dlc/a_vacaciones');
    response.render('a_vacaciones', {vacaciones: Vacaciones.fetchAll()});
};

exports.post_a_vacaciones = (request, response, next) => {
    console.log('POST /dlc/s_vacaciones');
    console.log(request.body);
    const vacaciones =
        new Vacaciones(request.body.estatus_vacaciones);
    vacaciones.save();
    response.redirect('/dlc');
};
//------------------------Aprobar Vacaciones--------------------------------


//------------------------Main--------------------------------
exports.listar = (request, response, next) => {
    console.log('Ruta /dlc');
    //
    console.log(request.cookies);
    const info = request.session.info ? request.session.info : '';
    request.session.info = '';
    response.render('main', {
      noticia: Noticia.fetchAll(),
      objetivo: Objetivo.fetchAll(),
      publicacion: Publicacion.fetchAll(),
      username: request.session.username ? request.session.username : '',
      ultimo_ng_block: request.cookies.ultimo_ng_block ? request.cookies.ultimo_ng_block : '',
      info: info //El primer info es la variable del template, el segundo la constante creada arriba
    });
    }
//------------------------Main--------------------------------
