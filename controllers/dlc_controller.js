
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
const User = require('../models/user');

//------------------------Solicitar NG Block--------------------------------
exports.get_s_ng_block = (request, response, next) => {
    console.log('GET /dlc/s_ng_block');
    response.render('s_ng_block', {
      //
              correo_usuario: request.session.correo_usuario ? request.session.correo_usuario : '',
              info: ''
          });
      };
//

exports.post_s_ng_block = (request, response, next) => {
    console.log('POST /dlc/s_ng_block');
    console.log(request.body);
    const ng_block =
        new Ng_Block(
          request.body.no_empleado,
          request.body.turno_ng_block,
          request.body.descripcion_ng_block,
          request.body.fecha_uso_ng_block,
          request.body.estatus_ng_block,
          );
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
                correo_usuario: request.session.correo_usuario ? request.session.correo_usuario : '',
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


//------------------------Consultar Vacacciones solicitadas--------------------------------
exports.get_vacaciones_solicitadas = (request, response, next) => {
    const no_empleado = request.session.user_no_empleado;
    console.log('GET /dlc/:no_empleado/vacaciones_solicitadas');
    console.log(request.params.no_empleado);
    console.log(request.session.user_no_empleado);
    //console.log(request.get('Cookie').split('=')[1]);
    console.log(request.cookies);
    console.log('GET /dlc/:no_empleado/vacaciones_solicitadas');
    const info = request.session.info ? request.session.info : '';
    request.session.info = '';
    Vacaciones.fetchSome(no_empleado)
    .then(([rows, fieldData]) => {
      console.log(rows);
      response.render('vacaciones_solicitadas', {
          vacaciones: rows,
          ultimo_sol_vacaciones: request.cookies.ultimo_sol_vacaciones ? request.cookies.ultimo_sol_vacaciones : '',
          info: info //El primer info es la variable del template, el segundo la constante creada arriba
      });
  })

  .catch(err => {
      console.log(err);
  });
}

//------------------------Consultar Vacacciones solicitadas--------------------------------


//------------------------Consultar NG Blocks solicitadas--------------------------------
exports.get_ngblocks_solicitados = (request, response, next) => {
    const no_empleado = request.session.user_no_empleado;
    console.log('GET /dlc/:no_empleado/get_ngblocks_solicitados');
    console.log(request.session.user_no_empleado);
    //console.log(request.get('Cookie').split('=')[1]);
    console.log(request.cookies);
    console.log('GET /dlc/:no_empleado/get_ngblocks_solicitados');
    const info = request.session.info ? request.session.info : '';
    request.session.info = '';
    Ng_Block.fetchSome(no_empleado)
    .then(([rows, fieldData]) => {
      console.log(rows);
      response.render('ngblocks_solicitados', {
          ng_block: rows,
          correo_usuario: request.session.correo_usuario ? request.session.correo_usuario : '',
          info: info //El primer info es la variable del template, el segundo la constante creada arriba
      });
  })
  .catch(err => {
      console.log(err);
  });
}
//------------------------Consultar NGblocks solicitadas--------------------------------



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
              correo_usuario: request.session.correo_usuario ? request.session.correo_usuario : '',
              info: ''
          });
      };
//

exports.post_s_vacaciones = (request, response, next) => {
    console.log('POST /dlc/s_vacaciones');
    console.log(request.body);
    const vacaciones =
        new Vacaciones(
          request.body.no_empleado,
          request.body.responsable_ausencia,
          request.body.observaciones,
          request.body.reanudacion_labores,
          request.body.fecha_primer_dia,
          request.body.fecha_ultimo_dia,
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
exports.get_aprobar_vacaciones = (request, response, next) => {
    console.log('GET /dlc/a_vacaciones');
    Vacaciones.fetchAll()
    .then(([rows, fieldData]) => {
        console.log(rows);
        response.render('a_vacaciones', {
            vacaciones: rows,
        });
    })
    .catch(err => {
        console.log(err);
    });
}


exports.get_aprobar_vacaciones_pagination = (request, response, next) => {
  console.log('GET /dlc/a_vacaciones/:page');
  var perPage = 5;
  var page = request.params.page || 1;
  Vacaciones
    .fetchPagination(perPage, ((perPage * page) - perPage))
    .then(([vacaciones, fieldData]) => {
      Vacaciones
        .count()
        .then(([count, fieldData]) => {
          console.log((count[0].num));
          const totalesV = count[0].num
          console.log(totalesV);
            response.render('estatus_vacaciones', {
                vacaciones: vacaciones,
                current: page,
                pages: Math.ceil( perPage / (totalesV / perPage))

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



exports.post_estatus_vacaciones = (request, response, next) => {
    console.log('POST /dlc/s_vacaciones');
    console.log(request.body);
    Vacaciones.updateEstatus(request.body.estatus_vacaciones, request.body.folio)
      .then(() => {
          response.redirect('a_vacaciones');
      }).catch(err => console.log(err));
  }

exports.aprobar_vacaciones_estatus = (request, response, next) => {
    console.log(request.params.estatus);
    Vacaciones.fetchByStatus(request.params.estatus)
        .then(([rows, fieldData]) => {
            console.log(rows);
            response.status(200).json(rows);
        })
        .catch(err => {
            console.log(err);
        });
}
//------------------------Aprobar Vacaciones--------------------------------

//------------------------Registrar Usuario--------------------------------
exports.get_registrar_empleado = (request, response, next) => {
    console.log('GET /dlc/registrar_empleado');
    Area.fetchAll()
      .then(([area, fieldData]) => {
        response.render('r_usuario', {
          correo_usuario: request.session.correo_usuario ? request.session.correo_usuario : '',
          info: '', //El primer info es la variable del template, el segundo la constante creada arriba
          area: area,
        });
    })
    .catch(err => {
        console.log(err);
    });
};

exports.post_registrar_empleado = (request, response, next) => {
    console.log('POST /dlc/registrar_empleado');

    console.log(request.body);
    const empleado =
        new Empleado(
          request.body.no_empleado,
          request.body.ng_blocks_restantes,
          request.body.fecha_contratacion,
          request.body.fecha_nacimiento,
          request.body.correo_empresarial,
          request.body.nombres_empleados,
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
exports.get_profile = (request, response, next) => {
    const no_empleado = request.session.user_no_empleado;
    console.log('Ruta /dlc/:no_empleado');
    console.log(request.session.user_no_empleado);
    console.log(request.cookies);
    console.log('Ruta /dlc/:no_empleado');
    const info = request.session.info ? request.session.info : '';
    request.session.info = '';
    Empleado.fetchEmpleadoAll(no_empleado)
        .then(([rows, fieldData]) => {
            console.log(rows);
            response.render('profile', {
                empleado: rows,
            });
        })
        .catch(err => {
            console.log(err);
        });
}
//------------------------Consultar informacion personal (perfil)---------------------------------


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
    console.log(request.file);
    const noticia = new Noticia(request.file.filename);
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
    console.log(request.file);
    const publicacion =
        new Publicacion(
          request.body.titulo_publicacion,
          request.body.descripcion_publicacion,
          request.file.filename);
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
          //console.log(rows); //Prueba
          //console.log(rows2); //Prueba
          response.render('main', {
            noticia: rows,
            publicacion: rows2,
            correo_usuario: request.session.correo_usuario ? request.session.correo_usuario : '',
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
