const path = require('path');
const Area = require('../models/area');
const Empleado = require('../models/empleado');
const Ng_Block = require('../models/ng_block');
const Noticia = require('../models/noticia');
const Objetivo = require('../models/objetivo');
const Permiso_informal = require('../models/permiso_informal');
const Prestaciones = require('../models/prestaciones');
const Publicacion = require('../models/publicacion');
const Vacaciones = require('../models/vacaciones');
const Nps = require('../models/nps');



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
    ng_block.save()
      .then(() => {
          request.session.info = 'El NG Block con fecha de uso de '+ ng_block.fecha_uso_ng_block + ' fue agregado con éxito';
          response.setHeader('Set-Cookie', 'ultimo_ng_block='+ng_block.fecha_uso_ng_block+'; HttpOnly');

          response.redirect('/dlc');
      })
      .catch(err => console.log(err));
};
//------------------------Solicitar NG Block--------------------------------

//------------------------Aprobar NG Block--------------------------------
exports.get_a_ng_block = (request, response, next) => {
    console.log('GET /dlc/a_ng_block');
    console.log(request.cookies);
    const info = request.session.info ? request.session.info : '';
    request.session.info = '';
    Ng_Block.fetchAll()
        .then(([rows, fieldData]) => {
            console.log(rows);
            response.render('a_ng_block', {
                ng_block: rows,
                username: request.session.username ? request.session.username : '',
                ultimo_estatus_ng: request.cookies.ultimo_estatus_ng ? request.cookies.ultimo_estatus_ng : '',
                info: info //El primer info es la variable del template, el segundo la constante creada arriba
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.post_a_ng_block = (request, response, next) => {
    console.log('POST /dlc/a_ng_block');
    console.log(request.body);
    const ng_block =
        new Ng_Block(
          request.body.estatus_ng_block);
    ng_block.save()
    .then(() => {
        request.session.info = 'Los cambios se guardaron con éxito';
        response.setHeader('Set-Cookie', 'ultimo_estatus_ng=' + ng_block.id_ng_block + '; HttpOnly');
        response.redirect('/dlc');
    })
    .catch(err => console.log(err));
};
//------------------------Aprobar NG Block--------------------------------

//------------------------ Reportes NPS se va a borrar --------------------------------
exports.get_nps = (request, response) => {
    console.log('GET /dlc/nps');
    response.render('nps', {
        nps: Nps.fetchAll(),
    });
};
//------------------------ Reportes NPS se va a borrar --------------------------------

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
    vacaciones.save()
    .then(() => {
        request.session.info = 'Las vacaciones con fecha de uso de '+ vacaciones.primer_dia + ' fue agregado con éxito';
        response.setHeader('Set-Cookie', 'ultimo_ng_block='+vacaciones.primer_dia+'; HttpOnly');

        response.redirect('/dlc');
    })
    .catch(err => console.log(err));
};

//------------------------Solicitar Vacaciones--------------------------------

//------------------------Aprobar Vacaciones--------------------------------
exports.get_a_vacaciones = (request, response, next) => {
    console.log('GET /dlc/a_vacaciones');
    console.log(request.cookies);
    const info = request.session.info ? request.session.info : '';
    request.session.info = '';
    Vacaciones.fetchAll()
    .then(([rows, fieldData]) => {
        console.log(rows);
        response.render('a_vacaciones', {
            vacaciones: rows,
            username: request.session.username ? request.session.username : '',
            ultimo_estatus_vacaciones: request.cookies.ultimo_estatus_vacaciones ? request.cookies.ultimo_estatus_vacaciones : '',
            info: info //El primer info es la variable del template, el segundo la constante creada arriba
        });
    })
    .catch(err => {
        console.log(err);
    });
}

exports.post_a_vacaciones = (request, response, next) => {
    console.log('POST /dlc/s_vacaciones');
    console.log(request.body);
    const vacaciones =
        new Vacaciones(
          request.body.estatus_vacaciones);
    vacaciones.save()
    .then(() => {
        request.session.info = 'Los cambios se guardaron con éxito';
        response.setHeader('Set-Cookie', 'ultimo_estatus_vacaciones='+vacaciones.id_vacaciones+'; HttpOnly');

        response.redirect('/dlc');
    })
    .catch(err => console.log(err));
};
//------------------------Aprobar Vacaciones--------------------------------

//------------------------Registrar Usuario--------------------------------
exports.get_r_usuario = (request, response, next) => {
    console.log('GET /dlc/r_usuario');
    console.log(request.cookies);
    const info = request.session.info ? request.session.info : '';
    request.session.info = '';
    Area.fetchAll()
      .then(([rows, fieldData]) => {
        console.log(rows); //Prueba
        response.render('r_usuario', {
          area: rows,
          username: request.session.username ? request.session.username : '',
          ultimo_empleado: request.cookies.ultimo_empleado ? request.cookies.ultimo_empleado : '',
          info: info //El primer info es la variable del template, el segundo la constante creada arriba
        });
    })
    .catch(err => {
        console.log(err);
    });
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
        /*request.body.id_area*/);
    empleado.save()
    .then(() => {
        request.session.info = 'El empleado fue registrado con éxito';
        response.setHeader('Set-Cookie', 'ultimo_empleado='+empleado.no_empleado+'; HttpOnly');

        response.redirect('/dlc');
    })
    .catch(err => console.log(err));
};
//------------------------Registrar Usuario--------------------------------


//------------------------Consultar informacion personal (perfil)--------------------------------
exports.get_d_usuario = (request, response, next) => {
    console.log('GET /dlc/d_usuario');
    console.log(request.cookies);
    const info = request.session.info ? request.session.info : '';
    request.session.info = '';
    Empleado.fetchAll() //cambiar a fetchOne falta definir la consulta
    .then(([rows, fieldData]) => {
      console.log(rows); //Prueba
      response.render('datos_empleado', {
        empleado: rows,
        username: request.session.username ? request.session.username : '',
      });
    })
    .catch(err => {
        console.log(err);
    });
  }
//------------------------Consultar informacion personal (perfil)---------------------------------

//------------------------Consultar las solicitudes de vacaciones--------------------------------
exports.get_v_vacaciones = (request, response, next) => {
    console.log('GET /dlc/d_usuario/v_vacaciones');
    Vacaciones.fetchAll()
    .then(([rows, fieldData]) => {
        console.log(rows);
        response.render('v_vacaciones', {
            vacaciones: rows
        });
    })
    .catch(err => {
        console.log(err);
    });
}
//------------------------Consultar las solicitudes de vacaciones--------------------------------

//------------------------Consultar las solicitudes de NG BLOCK--------------------------------
exports.get_v_ng_block = (request, response, next) => {
    console.log('GET /dlc/d_usuario/v_ng_block');
    Ng_Block.fetchAll()
    .then(([rows, fieldData]) => {
        console.log(rows);
        response.render('v_ng_block', {
            ng_block: rows
        });
    })
    .catch(err => {
        console.log(err);
    });
}

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
    const noticia = new Noticia(request.body.url_imagen_noticia);
    noticia.save()
    .then(() => {
        request.session.info ='Fue registrado con éxito';
        /*request.session.info ='Fue registrado con éxito';
        response.setHeader('Set-Cookie',
            'ultimo_noticia='+noticia.url_imagen_noticia+'; HttpOnly');
            'ultimo_noticia='+noticia.url_imagen_noticia+'; HttpOnly');*/
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
        Publicacion.fetchAll()
        .then(([rows2, fieldData]) => {
          console.log(rows); //Prueba
          console.log(rows2); //Prueba
          response.render('main', {
            noticia: rows,
            publicacion: rows2,
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
//------------------------Main--------------------------------
