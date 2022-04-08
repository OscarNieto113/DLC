
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
exports.get_solicitar_ng_block = (request, response, next) => {
  const no_empleado = request.session.user_no_empleado;
    console.log('GET /dlc/solicitar_ng_block');
      Empleado.getBlocksR(no_empleado)
          .then(([rows, fieldData]) => {
              response.render('solicitar_ng_block', {
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

exports.post_solicitar_ng_block = (request, response, next) => {
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
        if (turno_ng_block.length == 0 && descripcion_ng_block.length == 0 && fecha_uso_ng_block.length == 0){
          request.flash('error', 'No se recibio ningun dato.');
          response.redirect('/dlc/solicitar_ng_block');
        }

        else if (turno_ng_block.length == 0 || descripcion_ng_block.length == 0 || fecha_uso_ng_block.length == 0){
          request.flash('error', 'Faltan datos por llenar.');
          response.redirect('/dlc/solicitar_ng_block');
        }

        else if (ng_blocks_restantes <= 0){
          request.flash('error', 'No posees más Ng Blocks');
          response.redirect('/dlc/solicitar_ng_block');
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
              response.redirect('/dlc/solicitar_ng_block');
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
                pages: Math.ceil(totalesN / perPage),
                success: request.flash("success"),
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
            console.log("Se rechazo la solicitud");
            request.flash('success', 'El NG Block con folio ' + id_ng_block + ' fue RECHAZADO con éxito');
            response.redirect('/dlc/a_ng_blocksp/1');
          }).catch(err => console.log(err));
};

      exports.post_aprovee_ng_blocks = (request, response, next) => {
          console.log('POST /dlc/a_ng_blocksp/:page/aprovee');
          const estatus_ng_block = request.body.estatus_ng_block;
          const id_ng_block = request.body.id_ng_block;
          const no_empleado = request.body.no_empleado;

          console.log(estatus_ng_block);
          console.log(id_ng_block);
          console.log(no_empleado);
          Empleado.getBlocksR(no_empleado)
            .then(([rows, fielData])=>{
              console.log(rows[0].ng_blocks_restantes);
              const ng_blocks_restantes = rows[0].ng_blocks_restantes;
              if (ng_blocks_restantes <= 0){
                request.flash('error', 'Este Usuario no posee más Ng Blocks');
                response.redirect('/dlc/a_ng_blocksp/1');
              }

              else {
                Ng_Block
                  .aproveeNGBlock(
                    estatus_ng_block,
                    id_ng_block,
                    no_empleado)
                  .then(() => {
                    console.log("Se aprobo la solicitud");
                    request.flash('success', 'El NG Block con folio ' + id_ng_block + ' fue APROBADO con éxito');
                    response.redirect('/dlc/a_ng_blocksp/1');
                  }).catch(err => console.log(err));
              }
            }).catch((error)=>{
                console.log(error)
            });
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
    console.log('GET /dlc/profile/vacaciones_solicitadas');
    console.log(request.params.no_empleado);//
    console.log(request.session.user_no_empleado);//
    Vacaciones.fetchSome(no_empleado)
    .then(([rows, fieldData]) => {
      console.log(rows);
      response.render('vacaciones_solicitadas', {
          vacaciones: rows,
          success: request.flash("success"),
          error: request.flash("error")
      });
  })
  .catch(err => {
      console.log(err);
  });
};


exports.post_delete_vacaciones_solicitadas = (request, response, next) => {
    console.log('POST /dlc/vacaciones_solicitadas/delete/:folio');
    const folio = request.body.folio;
    const no_empleado = request.session.user_no_empleado;
    Vacaciones.getEstatus(no_empleado, folio)
      .then(([rows, fielData])=>{
        console.log(rows[0].estatus_vacaciones);
        const estatus_vacaciones = rows[0].estatus_vacaciones;

        if (estatus_vacaciones == 'Aprobado' || estatus_vacaciones == 'Rechazado'){
          request.flash('error', 'No puedes eliminar una solicitud de Vacaciones que esté en estatus Aprobado o Rechazado');
          response.redirect('/dlc/profile/vacaciones_solicitadas');
        }

        else {
          Vacaciones.deleteVacations(
            folio)
            .then(() => {
              console.log("Se elimino la solicitud");
              request.flash('success', 'La solicitud de vacaciones se eliminó con éxito');
              response.redirect('/dlc/profile/vacaciones_solicitadas');
            }).catch(err => console.log(err));
        }
      }).catch((error)=>{
          console.log(error)
      });
    };

//------------------------Consultar Vacacciones solicitadas--------------------------------


//------------------------Consultar NG Blocks solicitadas--------------------------------
exports.get_ngblocks_solicitados = (request, response, next) => {
    const no_empleado = request.session.user_no_empleado;
    console.log('GET /dlc/profile/vacaciones_solicitadas');
    console.log(request.params.no_empleado);//
    console.log(request.session.user_no_empleado);//
    Ng_Block.fetchSome(no_empleado)
    .then(([rows, fieldData]) => {
      console.log(rows);
      response.render('ngblocks_solicitados', {
          ng_block: rows,
          success: request.flash("success"),
          error: request.flash("error")
      });
  })
  .catch(err => {
      console.log(err);
  });
};

exports.post_delete_ng_block_solicitadas = (request, response, next) => {
    console.log('POST /dlc/profile/ngblocks_solicitados/delete/:id_ng_block');
    const id_ng_block = request.body.id_ng_block;
    const no_empleado = request.session.user_no_empleado;
    Ng_Block.getEstatus(no_empleado, id_ng_block)
      .then(([rows, fielData])=>{
        console.log(rows[0].estatus_ng_block);
        const estatus_ng_block = rows[0].estatus_ng_block;

        if (estatus_ng_block == 'Aprobado' || estatus_ng_block == 'Rechazado'){
          request.flash('error', 'No puedes eliminar una solicitud de Ng Block que esté en estatus Aprobado o Rechazado');
          response.redirect('/dlc/profile/ngblocks_solicitados');
        }

        else {
          Ng_Block.deleteNgBlock(
            request.body.id_ng_block)
            .then(() => {
              console.log("Se elimino la solicitud");
              request.flash('success', 'La solicitud de Ng Blocks se eliminó con éxito');
                response.redirect('/dlc/profile/ngblocks_solicitados');
            }).catch(err => console.log(err));
        }
      }).catch((error)=>{
          console.log(error)
      });
    };
//------------------------Consultar NGblocks solicitadas--------------------------------

//------------------------Solicitar Vacaciones--------------------------------
exports.get_solicitar_vacaciones = (request, response, next) => {
    const no_empleado = request.session.user_no_empleado;
    console.log('GET /dlc/s_vacaciones');
    Empleado
      .getAreaEmpleado(no_empleado)
      .then(([id_area, fieldData]) => {
        //console.log(id_area);
        let id = id_area[0].id_area
        //console.log(id);
        Empleado.fetchEmpleadoArea(id)
          .then(([rows, fieldData]) => {
            Empleado.getVacacionesR(no_empleado)
              .then(([rows2, fieldData]) => {
                response.render('solicitar_vacaciones', {
                  empleadoV: rows2,
                  empleado: rows,
                  success: request.flash("success"),
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
      })
      .catch(err => {
          console.log(err);
      });
  };

exports.post_solicitar_vacaciones = (request, response, next) => {
    console.log('POST /dlc/solicitar_vacaciones');
    const no_empleado = request.session.user_no_empleado;
    const responsable_ausencia = request.body.responsable_ausencia;
    const fecha_primer_dia = request.body.fecha_primer_dia;
    const fecha_ultimo_dia = request.body.fecha_ultimo_dia;
    const dias_solicitados = request.body.dias_solicitados;

    console.log(no_empleado);
    console.log(responsable_ausencia);
    console.log(fecha_primer_dia);
    console.log(fecha_ultimo_dia);
    console.log(dias_solicitados);

    Empleado.getVacacionesR(no_empleado)
      .then(([rows2, fieldData]) => {
        console.log(rows2[0].dias_vacaciones_restantes);
        const dias_vacaciones_restantes = rows2[0].dias_vacaciones_restantes;

        if (responsable_ausencia == undefined && fecha_primer_dia.length == 0 && fecha_ultimo_dia.length == 0 && dias_solicitados.length == 0){
          request.flash('error', 'No se recibio ningun dato.');
          response.redirect('/dlc/s_vacaciones');
        }

        else if (responsable_ausencia == undefined || fecha_primer_dia.length == 0 || fecha_ultimo_dia.length == 0 || dias_solicitados.length == 0){
          request.flash('error', 'Faltan datos por llenar.');
          response.redirect('/dlc/s_vacaciones');
        }

        else if (dias_vacaciones_restantes < dias_solicitados){
          request.flash('error', 'Solo posees ' + dias_vacaciones_restantes + '. No puedes solicitar más de las que posees');
          response.redirect('/dlc/s_vacaciones');
        }

        else {
          const vacaciones =
            new Vacaciones(
              no_empleado,
              responsable_ausencia,
              fecha_primer_dia,
              fecha_ultimo_dia,
              dias_solicitados,
            );
            vacaciones.save()
            .then(() => {
              console.log("Se guardo la solicitud");
              request.flash('success', 'Las vacaciones con fecha de uso de ' + fecha_primer_dia + ', hasta ' + fecha_ultimo_dia + ' con ' + dias_solicitados + ' días solicitados fue agregada con éxito');
              response.redirect('/dlc/s_vacaciones');
            })
            .catch(err => console.log(err));
          }
        }).catch((error)=>{console.log(error)});
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
            response.render('aprobar_vacaciones', {
                vacaciones: vacaciones,
                current: page,
                pages: Math.ceil(totalesV / perPage),
                success: request.flash("success"),
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


exports.post_reject_vacaciones = (request, response, next) => {
    console.log('POST /dlc/a_vacacionesp/:page/reject');
    const estatus_vacaciones = request.body.estatus_vacaciones;
    const folio = request.body.folio;

    console.log(estatus_vacaciones);
    console.log(folio);

    Vacaciones.rejectVacations(
      estatus_vacaciones,
      folio)
      .then(() => {
          console.log("Se rechazo la solicitud");
          request.flash('success', 'La solicitud con folio ' + folio + ' fue RECHAZADA con éxito');
          response.redirect('/dlc/a_vacacionesp/1');
      }).catch(err => console.log(err));
  };

  exports.post_aprovee_vacaciones = (request, response, next) => {
      console.log('POST /dlc/a_vacacionesp/:page/aprovee');
      const estatus_vacaciones = request.body.estatus_vacaciones;
      const dias_solicitados = request.body.dias_solicitados;
      const folio = request.body.folio;
      const no_empleado = request.body.no_empleado;

      console.log(estatus_vacaciones);
      console.log(dias_solicitados);
      console.log(folio);
      console.log(no_empleado);

      Empleado.getVacacionesR(no_empleado)
        .then(([rows, fielData])=>{
          console.log(rows[0].dias_vacaciones_restantes);
          const dias_vacaciones_restantes = rows[0].dias_vacaciones_restantes;
          if (dias_vacaciones_restantes < dias_solicitados){
            request.flash('error', 'Este Usuario no posee días de vacaciones');
            response.redirect('/dlc/a_vacacionesp/1');
          }

          else {
            Vacaciones
              .aproveeVacations(
                request.body.estatus_vacaciones,
                request.body.dias_solicitados,
                request.body.folio,
                request.body.no_empleado)
              .then(() => {
                  console.log("Se aprobo la solicitud");
                  request.flash('success', 'La solicitud con folio ' + folio + ' fue APROBADA con éxito');
                  response.redirect('/dlc/a_vacacionesp/1');
              }).catch(err => console.log(err));
            }
          }).catch((error)=>{
              console.log(error)
          });
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
                success: request.flash("success"),
                error: request.flash("error"),
                success1: request.flash("success1"),
                error1: request.flash("error1"),
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
    const giveVacations = request.body.giveVacations;
    const no_empleado = request.body.no_empleado;

    console.log(giveVacations);
    console.log(no_empleado);

      if (giveVacations === 0 && no_empleado.length == 0 ){
        request.flash('error', 'No se recibio ningun dato.');
        response.redirect('/dlc/buscar_empleado/'+ no_empleado);
      }

      else if (giveVacations === 0 && no_empleado.length == 0 ){
        request.flash('error', 'Faltan datos por llenar.');
        response.redirect('/dlc/buscar_empleado/'+ no_empleado);
      }

      else if (giveVacations > 5){
        request.flash('error', 'Estas agregando más vacaciones de las permitidas por el sistema');
        response.redirect('/dlc/buscar_empleado/'+ no_empleado);
      }

      else {
        Vacaciones.giveVacations(giveVacations,no_empleado)
        .then(() => {
            console.log("Se guardó los cambios");
            request.flash('success', 'Las vacaciones fueron agregadas con éxito');
            response.redirect('/dlc/buscar_empleado/'+ no_empleado);
        })
        .catch(err => console.log(err));
      }
  };
//-------------------------Dar dias de vacaciones (perfil)---------------------------------

//------------------------Dar Ng Blocks (perfil)--------------------------------
exports.post_give_ng_blocks = (request, response, next) => {
    console.log('POST /dlc/buscar_empleado/:no_empleado/ng_blocks');
    console.log(request.body);

      const giveNgBlocks = request.body.giveNgBlocks;
      const no_empleado = request.body.no_empleado;

      console.log(giveNgBlocks);
      console.log(no_empleado);

        if (giveNgBlocks === 0 && no_empleado.length == 0 ){
          request.flash('error', 'No se recibio ningun dato.');
          response.redirect('/dlc/buscar_empleado/'+ no_empleado);
        }

        else if (giveNgBlocks === 0 && no_empleado.length == 0 ){
          request.flash('error', 'Faltan datos por llenar.');
          response.redirect('/dlc/buscar_empleado/'+ no_empleado);
        }

        else if (giveNgBlocks > 5){
          request.flash('error', 'Estas agregando más ng blocks de las permitidas por el sistema');
          response.redirect('/dlc/buscar_empleado/'+ no_empleado);
        }

        else {
          Ng_Block.giveNgBlocks(giveNgBlocks,no_empleado)
          .then(() => {
              console.log("Se guardó los cambios 2");
              request.flash('success', 'Los ng blocks fueron agregadas con éxito');
              response.redirect('/dlc/buscar_empleado/'+ no_empleado);
          })
          .catch(err => console.log(err));
        }
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
    console.log(request.file);

    const filename = request.file.filename;

    console.log(filename);

        if (filename.length == undefined){
          request.flash('error', 'No se recibio ningun archivo.');
          response.redirect('/dlc');
        }

        else {
          const noticia =
              new Noticia(
                filename,
                );

          noticia.save()
          .then(() => {
              console.log("Se guardo la publicacion");
              request.flash('success', 'La noticia fue agregado con éxito');
              response.redirect('/dlc');
          })
          .catch((error)=>{
            console.log(error)
          });
        }
};
//

exports.post_publicacion = (request, response, next) => {
    console.log('POST /dlc/publicacion');

    const titulo_publicacion = request.body.titulo_publicacion;
    const descripcion_publicacion = request.body.descripcion_publicacion;
    const filename = request.file.filename;

    console.log(titulo_publicacion);
    console.log(descripcion_publicacion);
    console.log(filename);

        if (titulo_publicacion.length == 0 && descripcion_publicacion.length == 0 && filename.length == undefined){
          request.flash('error1', 'No se recibio ningun dato.');
          response.redirect('/dlc');
        }

        else if (titulo_publicacion.length == 0 || descripcion_publicacion.length == 0 || filename.length == undefined){
          request.flash('error1', 'Faltan datos por llenar.');
          response.redirect('/dlc');
        }

        else {
          const publicacion =
              new Publicacion(
                titulo_publicacion,
                descripcion_publicacion,
                filename,
                );

          publicacion.save()
          .then(() => {
              console.log("Se guardo la publicacion");
              request.flash('success1', 'La publicación ' + titulo_publicacion + ' fue agregado con éxito');
              response.redirect('/dlc');
          })
          .catch((error)=>{
            console.log(error)
          });
        }
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
            success: request.flash("success"),
            error: request.flash("error"),
            publicacion: rows2,
            success1: request.flash("success1"),
            error1: request.flash("error1"),
            correo_usuario: request.session.correo_usuario ? request.session.correo_usuario : '',
            ultimo_ng_block: request.cookies.ultimo_ng_block ? request.cookies.ultimo_ng_block : '',
            info: info, //El primer info es la variable del template, el segundo la constante creada arriba
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
