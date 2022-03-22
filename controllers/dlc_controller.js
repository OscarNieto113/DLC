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
const NPS = require('../models/nps');
const Chart = require ('chart.js/auto');

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
        new Ng_Block(
          request.body.id_ng_block,
          request.body.turno_ng_block,
          request.body.descripcion_ng_block,
          request.body.fecha_uso_ng_block,
          request.body.fecha_solicitud_ng_block,
          request.body.estatus_ng_block,
          request.body.no_empleado);
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
    console.log('POST /dlc/a_ng_block');
    console.log(request.body);
    const ng_block =
        new Ng_Block(request.body.estatus_ng_block);
    ng_block.save();
    response.redirect('/dlc');
};
//------------------------Aprobar NG Block--------------------------------

//------------------------ Reportes NPS --------------------------------
exports.get_nps = (request, response) => {
    console.log('GET /dlc/nps');
    response.render('nps', {
        nps: NPS.fetchAll(),
    });
};
//------------------------ Reportes NPS --------------------------------

//------------------------Solicitar Vacaciones--------------------------------
exports.get_s_vacaciones = (request, response, next) => {
    console.log('GET /dlc/s_vacaciones');
    response.render('s_vacaciones', {
      //
              username: request.session.username ? request.session.username : '',
              info: ''
          });
      };
//

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
    vacaciones.save();
    //
    request.session.info = 'Las vacaciones solicitadas para el dia '+ vacaciones.primer_dia + ' fue agregado con éxito';
    response.setHeader('Set-Cookie', 'ultimo_vacaciones='+vacaciones.primer_dia+'; HttpOnly');
    response.redirect('/dlc');
};
//
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

//------------------------Registrar Usuario--------------------------------
exports.get_r_usuario = (request, response, next) => {
    console.log('GET /dlc/r_usuario');
    response.render('r_usuario', {empleado: Empleado.fetchAll()});
};

exports.post_r_usuario = (request, response, next) => {
    console.log('POST /dlc/r_usuario');
    console.log(request.body);
    const empleado =
        new Empleado(
          request.body.no_empleado,
          request.body.ng_blocks_restantes,
          request.body.fecha_contratacion,
          request.body.fecha_nacimiento,
          request.body.correo_empresarial,
          request.body.nombres_empleado,
          request.body.apellido_paterno,
          request.body.apellido_materno,
          request.body.dias_vacaciones_restantes,
          request.body.genero_empleado,
          request.body.id_area);
    empleado.save();
    response.redirect('/dlc');
};
//------------------------Registrar Usuario--------------------------------


//------------------------Consultar datos--------------------------------
exports.get_d_usuario = (request, response, next) => {
    console.log('GET /dlc/d_usuario');
    response.render('datos_empleado', {empleado: Empleado.fetchAll()});
};
//------------------------Consultar datos--------------------------------

//------------------------Consultar las solicitudes de vacaciones--------------------------------
exports.get_v_vacaciones = (request, response, next) => {
    console.log('GET /dlc/d_usuario/v_vacaciones');
    response.render('v_vacaciones', {vacaciones: Vacaciones.fetchAll()});
};
//------------------------Consultar las solicitudes de vacaciones--------------------------------

//------------------------Consultar las solicitudes de NG BLOCK--------------------------------
exports.get_v_ng_block = (request, response, next) => {
    console.log('GET /dlc/d_usuario/v_ng_block');
    response.render('v_ng_block', {ng_block: Ng_Block.fetchAll()});
};
//------------------------Consultar las solicitudes de NG BLOCK--------------------------------


//------------------------Main--------------------------------
/*
exports.post_objetivo = (request, response, next) => {
    console.log('POST /dlc/objetivo');
    console.log(request.body);
    const objetivo =
        new Objetivo(
          request.body.id_objetivo,
          request.body.nombre_objetivo,
          request.body.descripcion_objetivo);
    objetivo.save();
    response.redirect('/dlc');
};*/

exports.post_noticia = (request, response, next) => {
    console.log('POST /dlc/noticia');
    console.log(request.body);
    const noticia =
        new Noticia(
          request.body.url_imagen_noticia);
    noticia.save()
    //
    .then(() => {
        request.session.info ='Fue registrado con éxito';
        response.setHeader('Set-Cookie',
            'ultimo_noticia='+noticia.url_imagen_noticia+'; HttpOnly');
        response.redirect('/dlc');
    })
    .catch(err => console.log(err));
};
//

exports.post_publicacion = (request, response, next) => {
    console.log('POST /dlc/publicacion');
    console.log(request.body);
    const publicacion =
        new Publicacion(
          request.body.titulo_publicacion,
          request.body.descripcion_publicacion,
          request.body.url_imagen_publicacion);
    publicacion.save()
    //
    .then(() => {
        request.session.info ='Fue registrado con éxito';
        response.setHeader('Set-Cookie',
            'ultimo_publicacion='+publicacion.titulo_publicacion+'; HttpOnly');
        response.redirect('/dlc');
    })
    .catch(err => console.log(err));
};
//

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

      //objetivo: Objetivo.fetchAll(),
      /*publicacion: Publicacion.fetchAll(),
      username: request.session.username ? request.session.username : '',
      ultimo_ng_block: request.cookies.ultimo_ng_block ? request.cookies.ultimo_ng_block : '',
      info: info //El primer info es la variable del template, el segundo la constante creada arriba
    });
  }*/
    //
//------------------------Main--------------------------------
