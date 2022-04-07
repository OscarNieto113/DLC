
const Area = require('../models/area');
const Empleado = require('../models/empleado');
const Ng_Block = require('../models/ng_block');
const Noticia = require('../models/noticia');
const Objetivo = require('../models/objetivo');
const Permiso_informal = require('../models/permiso_informal');
const Prestaciones = require('../models/prestaciones');
const Publicacion = require('../models/publicacion');
const Vacaciones = require('../models/vacaciones');
//const Reportes_mensuales = require('../models/reportes_mensuales');
const User = require('../models/user');

//------------------------Solicitar NG Block--------------------------------
exports.get_s_ng_block = (request, response, next) => {
  const no_empleado = request.session.user_no_empleado;
    console.log('GET /dlc/s_ng_block');
      Empleado.getBlocksR(no_empleado)
          .then(([rows, fieldData]) => {
              response.render('s_ng_block', {
                  empleado: rows,
                  success: request.flash("success"),
                  error: request.flash("error")
              });
          })
          .catch(err => {
              console.log(err);
          });
};
//

exports.post_s_ng_block = (request, response, next) => {
    const no_empleado = request.body.no_empleado;
    const turno_ng_block = request.body.turno_ng_block;
    const descripcion_ng_block = request.body.descripcion_ng_block;
    const fecha_uso_ng_block = request.body.fecha_uso_ng_block;

    console.log(no_empleado);
    console.log(turno_ng_block);
    console.log(descripcion_ng_block);
    console.log(fecha_uso_ng_block);

    Empleado.getBlocksR(no_empleado)
      .then(([rows, fielData])=>{
        console.log(rows[0].ng_blocks_restantes);
        const ng_blocks_restantes = rows[0].ng_blocks_restantes;
        if (turno_ng_block.lenght == 0 && descripcion_ng_block.lenght == 0 && fecha_uso_ng_block.lenght == 0){
          request.flash('error', 'No se recibio ningun dato.');
          response.redirect('/dlc/s_ng_block');
        }

        else if (turno_ng_block.lenght == 0 || descripcion_ng_block.lenght == 0 || fecha_uso_ng_block.lenght == 0){
          request.flash('error', 'Faltan datos por llenar.');
          response.redirect('/dlc/s_ng_block');
        }
        else if (ng_blocks_restantes <= 0){
          request.flash('error', 'No posees más Ng Blocks');
          response.redirect('/dlc/s_ng_block');
        }
        else {
          const ng_block =
              new Ng_Block(
                no_empleado,
                turno_ng_block,
                descripcion_ng_block,
                fecha_uso_ng_block,
                );
          ng_block.save()
          .then(() => {
              console.log("Se guardo la solicitud");
              request.flash('success', 'El NG Block con fecha de uso de ' + fecha_uso_ng_block + ' fue agregado con éxito');
              response.redirect('/dlc/s_ng_block');
          })
          .catch(err => console.log(err));
        }
  }).catch((error)=>{
      console.log(error)
  });
};
//------------------------Solicitar NG Block--------------------------------

//------------------------Aprobar NG Block--------------------------------
exports.get_aprobar_ng_blocks_pagination = (request, response, next) => {
  console.log('GET /dlc/a_ng_blocksp/:page');
  var perPage = 5;
  var page = request.params.page || 1;
  Ng_Block
    .fetchPagination(perPage, ((perPage * page) - perPage))
    .then(([ng_block, fieldData]) => {
      Ng_Block
        .count()
        .then(([count, fieldData]) => {
          let totalesN = count[0].num
          console.log(totalesN)
            response.render('aprobar_ngblocks', {
                ng_block: ng_block,
                current: page,
                pages: Math.ceil(totalesN / perPage)
            });
          })
          .catch(err => {
              console.log(err);
          });
        })
        .catch(err => {
            console.log(err);
        });
};

    exports.post_reject_ng_blocks = (request, response, next) => {
        console.log('POST /dlc/a_ng_blocksp/:page/reject');
        const estatus_ng_block = request.body.estatus_ng_block;
        const id_ng_block = request.body.id_ng_block;

        console.log(estatus_ng_block);
        console.log(id_ng_block);

        Ng_Block.rejectNGBlock(
          estatus_ng_block,
          id_ng_block)
          .then(() => {
              response.redirect('/dlc/a_ng_blocksp/1');
          }).catch(err => console.log(err));
};

      exports.post_aprovee_ng_blocks = (request, response, next) => {
          console.log('POST /dlc/a_ng_blocksp/:page/aprovee');

          console.log(request.body);
          Ng_Block
            .aproveeNGBlock(
              request.body.estatus_ng_block,
              request.body.id_ng_block,
              request.body.no_empleado)
            .then(() => {
                response.redirect('/dlc/a_ng_blocksp/1');
            }).catch(err => console.log(err));
        };

    exports.search_ngblock = (request, response, next) => {
        console.log(request.params.search);
        Ng_Block.fetchSearch(request.params.search)
            .then(([rows, fieldData]) => {
                console.log(rows);
                response.status(200).json(rows);
            })
            .catch(err => {
                console.log(err);
            });
    };
//------------------------Aprobar NG Block--------------------------------


//------------------------Consultar Vacacciones solicitadas--------------------------------

exports.get_vacaciones_solicitadas = (request, response, next) => {
    const no_empleado = request.session.user_no_empleado;
    console.log('GET /dlc/:no_empleado/vacaciones_solicitadas');
    console.log(request.params.no_empleado);//
    console.log(request.session.user_no_empleado);//
    Vacaciones.fetchSome(no_empleado)
    .then(([rows, fieldData]) => {
      console.log(rows);
      response.render('vacaciones_solicitadas', {
          vacaciones: rows,
      });
  })
  .catch(err => {
      console.log(err);
  });
};


exports.post_delete_vacaciones_solicitadas = (request, response, next) => {
    console.log('POST /dlc/vacaciones_solicitadas/delete/:folio');
    console.log(request.body);
    Vacaciones.deleteVacations(
      request.body.folio)
      .then(() => {
          response.redirect('/dlc/profile/vacaciones_solicitadas');
      }).catch(err => console.log(err));
  };

//------------------------Consultar Vacacciones solicitadas--------------------------------


//------------------------Consultar NG Blocks solicitadas--------------------------------
exports.get_ngblocks_solicitados = (request, response, next) => {
    const no_empleado = request.session.user_no_empleado;
    request.session.info = '';
    Ng_Block.fetchSome(no_empleado)
    .then(([rows, fieldData]) => {
      console.log(rows);
      response.render('ngblocks_solicitados', {
          ng_block: rows,
      });
  })
  .catch(err => {
      console.log(err);
  });
};

exports.post_delete_ng_block_solicitadas = (request, response, next) => {
    console.log('POST /dlc/profile/ngblocks_solicitados/delete/:id_ng_block');
    console.log(request.body);
    Ng_Block.deleteNgBlock(
      request.body.id_ng_block)
      .then(() => {
          response.redirect('/dlc/profile/ngblocks_solicitados');
      }).catch(err => console.log(err));
  };
//------------------------Consultar NGblocks solicitadas--------------------------------



//------------------------ Reportes NPS se va a borrar --------------------------------
/*
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
*/


//------------------------ Reportes NPS se va a borrar --------------------------------

//------------------------Solicitar Vacaciones--------------------------------
exports.get_solicitud_vacaciones = (request, response, next) => {
    const no_empleado = request.session.user_no_empleado;
    console.log('GET /dlc/solicitud_vacaciones');
    Empleado
      .getAreaEmpleado("A4")
      .then(([id_area, fieldData]) => {
        //console.log(id_area);
        //let id = id_area[0].id_area
        //console.log(id);
        Empleado.fetchEmpleadoArea(1)
          .then(([rows, fieldData]) => {
            Empleado.getVacacionesR(no_empleado)
              .then(([rows2, fieldData]) => {
                console.log(rows);
                console.log(rows2);
                response.render('solicitud_vacaciones', {
                  empleadoV: rows2,
                  empleado: rows,
                });
              })
              .catch(err => {
                  console.log(err);
          });
        })
        .catch(err => {
            console.log(err);
        });
      })
      .catch(err => {
          console.log(err);
      });
  };

exports.post_solicitud_vacaciones = (request, response, next) => {
    console.log('POST /dlc/solicitud_vacaciones');
    console.log(request.body);
    const vacaciones =
        new Vacaciones(
          request.body.no_empleado,
          request.body.responsable_ausencia,
          //request.body.observaciones,
          request.body.fecha_primer_dia,
          request.body.fecha_ultimo_dia,
          request.body.dias_solicitados);
          //request.body.estatus_vacaciones);
    vacaciones.save()
    .then(() => {
        request.session.info = 'Las vacaciones con fecha de uso de '+ vacaciones.primer_dia + ' fue agregado con éxito';
        response.setHeader('Set-Cookie',
         'ultimo_vacaciones='+vacaciones.primer_dia+'; HttpOnly');
        response.redirect('/dlc');
    })
    .catch(err => console.log(err));
};

//------------------------Solicitar Vacaciones--------------------------------

//------------------------Aprobar Vacaciones--------------------------------
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
          let totalesV = count[0].num
          console.log(totalesV)
            response.render('estatus_vacaciones', {
                vacaciones: vacaciones,
                current: page,
                pages: Math.ceil(totalesV / perPage)
            });
          })
          .catch(err => {
              console.log(err);
          });
        })
        .catch(err => {
            console.log(err);
        });
    };


exports.post_reject_vacaciones = (request, response, next) => {
    console.log('POST /dlc/a_vacacionesp/:page/reject');
    console.log(request.body);
    Vacaciones.rejectVacations(
      request.body.estatus_vacaciones,
      request.body.folio)
      .then(() => {
          response.redirect('/dlc/a_vacacionesp/1');
      }).catch(err => console.log(err));
  };

  exports.post_aprovee_vacaciones = (request, response, next) => {
      console.log('POST /dlc/a_vacacionesp/:page/aprovee');
      console.log(request.body);
      Vacaciones
        .aproveeVacations(
          request.body.estatus_vacaciones,
          request.body.dias_solicitados,
          request.body.folio,
          request.body.no_empleado)
        .then(() => {
            response.redirect('/dlc/a_vacacionesp/1');
        }).catch(err => console.log(err));
    };

exports.search_vacaciones = (request, response, next) => {
    console.log(request.params.search);
    Vacaciones.fetchSearch(request.params.search)
        .then(([rows, fieldData]) => {
            console.log(rows);
            response.status(200).json(rows);
        })
        .catch(err => {
            console.log(err);
        });
};
//------------------------Aprobar Vacaciones--------------------------------

//------------------------Modificar dias de vacaciones totales--------------------------------
exports.get_dias_vacaciones_totales = (request, response, next) => {
    console.log('GET /dlc/vacaciones_totales');
    Prestaciones.fetchAll()
    .then(([rows, fieldData]) => {
      //console.log(rows);
      response.render('modificar_vacaciones_totales', {
          prestaciones: rows,
      });
  })
  .catch(err => {
      console.log(err);
  });
};

exports.post_dias_vacaciones_totales = (request, response, next) => {
    console.log('POST /dlc/modificar_vacaciones_totales/:id_prestaciones');
    console.log(request.body);
    Prestaciones
      .updatePrestaciones(
        request.body.max_prestaciones,
        request.body.min_prestaciones,
        request.body.dias_prestaciones,
        request.body.id_prestaciones)
      .then(() => {
          response.redirect('/dlc/vacaciones_totales');
      }).catch(err => console.log(err));
  };

//------------------------Modificar dias de vacaciones totales--------------------------------

//------------------------Registrar empleado--------------------------------
exports.get_registrar_empleado = (request, response, next) => {
    console.log('GET /dlc/registrar_empleado');
    Area.fetchAll()
      .then(([area, fieldData]) => {
        console.log(area);
        response.render('registrar_empleado', {
          area: area
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
          request.body.id_area);
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
      };

exports.get_perfil_empleado = (request, response, next) => {
    Empleado.fetchEmpleadoAll(request.params.no_empleado)
        .then(([rows, fieldData]) => {
          console.log(rows)
            response.render('profile', {
                empleado: rows,
            });
        })
        .catch(err => {
            console.log(err);
          });
  };

//------------------------Consultar informacion personal (perfil)---------------------------------

//------------------------Buscar empleado (perfil)--------------------------------
exports.get_buscar_empleado = (request, response, next) => {
    console.log('Ruta /dlc/search_empleado');
    Empleado.search()
        .then(([rows, fieldData]) => {
            console.log(rows);
            response.render('buscar_empleado', {
                empleado: rows,
            });
        })
        .catch(err => {
            console.log(err);
        });
};
//-------------------------Buscar empleado (perfil)---------------------------------

//------------------------Dar dias de vacaciones (perfil)--------------------------------
exports.post_give_vacations = (request, response, next) => {
    console.log('POST /dlc/buscar_empleado/:no_empleado/vacaciones');
    console.log(request.body);
    Vacaciones.giveVacations(
      request.body.giveVacations,
      request.body.no_empleado)
      .then(() => {
          response.redirect('/dlc/buscar_empleado');
      }).catch(err => console.log(err));
  };
//-------------------------Dar dias de vacaciones (perfil)---------------------------------

//------------------------Dar Ng Blocks (perfil)--------------------------------
exports.post_give_ng_blocks = (request, response, next) => {
    console.log('POST /dlc/buscar_empleado/:no_empleado/ng_blocks');
    console.log(request.body);
    Ng_Block.giveNgBlocks(
      request.body.giveNgBlocks,
      request.body.no_empleado)
      .then(() => {
          response.redirect('/dlc/buscar_empleado');
      }).catch(err => console.log(err));
  };
//-------------------------Dar Ng Blocks (perfil)---------------------------------

//-------------------------Buscar Empleado (Ajax)---------------------------------
exports.search_empleado = (request, response, next) => {
    console.log(request.params.search);
    Empleado.fetchSearch(request.params.search)
        .then(([rows, fieldData]) => {
            console.log(rows);
            response.status(200).json(rows);
        })
        .catch(err => {
            console.log(err);
        });
};
//-------------------------Buscar Empleado (Ajax)---------------------------------

//------------------------Main--------------------------------
exports.post_noticia = (request, response, next) => {
    console.log('POST /dlc/noticia');
    console.log(request.body);
    console.log(request.file);
    const noticia = new Noticia(request.file.filename);
    noticia.save()
    .then(() => {
        request.session.info ='Fue registrado con éxito';
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
        request.flash('error','No se recibio ningun dato. 😢🙃');
        response.redirect('/dlc');
    })
    .catch(err => console.log(err));
};
//
/*
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
*/

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
          response.render('main', {
            noticia: rows,
            publicacion: rows2,
            correo_usuario: request.session.correo_usuario ? request.session.correo_usuario : '',
            ultimo_ng_block: request.cookies.ultimo_ng_block ? request.cookies.ultimo_ng_block : '',
            info: info, //El primer info es la variable del template, el segundo la constante creada arriba
            error: request.flash("error")
          });
      })
      .catch(err => {
          console.log(err);
      });
    })
    .catch(err => {
        console.log(err);
    });
};
//------------------------Main--------------------------------
