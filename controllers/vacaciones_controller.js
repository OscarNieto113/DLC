const Empleado = require('../models/empleado');
const Vacaciones = require('../models/vacaciones');
const Prestaciones = require('../models/prestaciones');
const Area = require('../models/area');
//------------------------Solicitar Vacaciones--------------------------------
exports.get_solicitar_vacaciones = (request, response, next) => {
    const no_empleado = request.session.user_no_empleado;
    console.log('GET /dlc/s_vacaciones');
    Empleado.getRol(no_empleado)
        .then(([rol, fieldData]) => {
        Empleado.getAreaEmpleado(no_empleado)
        .then(([id_area, fieldData]) => {
            let id = id_area[0].id_area
            Empleado.fetchEmpleadoArea(id)
            .then(([rows, fieldData]) => {
              Empleado.getVacacionesR(no_empleado)
              .then(([vacacionesR, fielData])=>{
                      response.render('solicitar_vacaciones', {
                          userRol: rol[0].id_rol,
                          empleadoV: vacacionesR,
                          empleado: rows,
                          success: request.flash("success"),
                          error: request.flash("error"),
                          isLoggedIn: request.session.isLoggedIn === true ? true : false
                          });
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};

exports.post_solicitar_vacaciones = (request, response, next) => {
    console.log('POST /dlc/solicitar_vacaciones');
    const no_empleado = request.session.user_no_empleado;
    const responsable_ausencia = request.body.responsable_ausencia;
    const fecha_primer_dia = request.body.fecha_primer_dia;
    const fecha_ultimo_dia = request.body.fecha_ultimo_dia;
    const dias_solicitados = request.body.dias_solicitados;
    const fecha_p2 = request.body.fecha_p2;
    const fecha_u2 = request.body.fecha_u2;

    console.log(no_empleado);
    console.log(responsable_ausencia);
    console.log(fecha_primer_dia);
    console.log(fecha_ultimo_dia);
    console.log(dias_solicitados);
    console.log(fecha_p2);
    console.log(fecha_u2);

    Empleado.getVacacionesR(no_empleado)
      .then(([rows2, fieldData]) => {
        var dias_vacaciones_restantes = rows2[0].dias_vacaciones_restantes;
        var dias_vacaciones_especiales = rows2[0].dias_vacaciones_especiales;
        const total_dias_vacaciones = dias_vacaciones_restantes + dias_vacaciones_especiales;


        if (responsable_ausencia == undefined && fecha_primer_dia.length == 0 && fecha_ultimo_dia.length == 0 && dias_solicitados.length == 0){
          request.flash('error', 'No se recibió ningún dato.');
          response.redirect('/dlc/s_vacaciones');
        }

        else if (responsable_ausencia == undefined || fecha_primer_dia.length == 0 || fecha_ultimo_dia.length == 0 || dias_solicitados.length == 0){
          request.flash('error', 'Faltan datos por llenar.');
          response.redirect('/dlc/s_vacaciones');
        }

        else if (total_dias_vacaciones < dias_solicitados){
          request.flash('error', 'Solo posees ' + total_dias_vacaciones + '. No puedes solicitar más de las que posees');
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
              request.flash('success', 'Las vacaciones con fecha de uso de ' + fecha_p2 + ', hasta ' + fecha_u2 + ' con ' + dias_solicitados + ' días solicitados fue agregada con éxito');
              response.redirect('/dlc/s_vacaciones');
            })
            .catch(err => console.log(err));
          }
        }).catch((error)=>{console.log(error)});
  };
//------------------------Solicitar Vacaciones--------------------------------

//------------------------Aprobar Vacaciones--------------------------------
exports.get_aprobar_vacaciones_pagination = (request, response, next) => {
  const no_empleado = request.session.user_no_empleado;
  console.log('GET /dlc/a_vacaciones/:page');
  var perPage = 10;
  var page = request.params.page || 1;

  Empleado.getRol(no_empleado)
  .then(([rol, fieldData]) => {
    console.log(rol[0].id_rol)
    const userRol = rol[0].id_rol;

    if (userRol === 3 ){
      Empleado.getDeparatamento(no_empleado)
      .then(([departamento, fieldData]) => {
        console.log(departamento[0].id_area)
        const depar = departamento[0].id_area;
          Empleado.getCiudad(no_empleado)
          .then(([ciudad, fieldData]) => {
            console.log(ciudad[0].id_ciudad)
            const estado = ciudad[0].id_ciudad;
              Area.fetchAll()
              .then(([area, fieldData]) => {
                    Vacaciones.fetchPagination2(depar, estado, perPage, ((perPage * page) - perPage))
                    .then(([vacaciones, fieldData]) => {
                        Vacaciones.count3(depar, estado)
                        .then(([count, fieldData]) => {
                            let totalesV = count[0].num
                            console.log(totalesV)
                              response.render('aprobar_vacaciones', {
                                  area: area,
                                  userRol: rol[0].id_rol,
                                  vacaciones: vacaciones,
                                  current: page,
                                  pages: Math.ceil(totalesV / perPage),
                                  success: request.flash("success"),
                                  error: request.flash("error"),
                                  isLoggedIn: request.session.isLoggedIn === true ? true : false
                              });
                          }).catch(err => console.log(err));
                      }).catch(err => console.log(err));
                  }).catch(err => console.log(err));
                }).catch(err => console.log(err));
              }).catch(err => console.log(err));
  }

  else {
    Area.fetchAll()
    .then(([area, fieldData]) => {
          Vacaciones.fetchPagination(perPage, ((perPage * page) - perPage))
          .then(([vacaciones, fieldData]) => {
              Vacaciones.count()
              .then(([count, fieldData]) => {
                  let totalesV = count[0].num
                  console.log(totalesV)
                    response.render('aprobar_vacaciones', {
                        area: area,
                        userRol: rol[0].id_rol,
                        vacaciones: vacaciones,
                        current: page,
                        pages: Math.ceil(totalesV / perPage),
                        success: request.flash("success"),
                        error: request.flash("error"),
                        isLoggedIn: request.session.isLoggedIn === true ? true : false
                    });
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
  }
    }).catch(err => console.log(err));

};

exports.get_aprobar_vacaciones_filtro = (request, response, next) => {
  const no_empleado = request.session.user_no_empleado;
  console.log('GET /dlc/a_vacaciones/departamento/:id_area');
  var perPage = 10;
  var page = request.params.page || 1;
  Area.fetchAll()
  .then(([area, fieldData]) => {
      Empleado.getRol(no_empleado)
      .then(([rol, fieldData]) => {
          Vacaciones.fetchFiltro(perPage, ((perPage * page) - perPage), request.params.id_area)
          .then(([vacaciones, fieldData]) => {
            console.log(vacaciones)
              Vacaciones.count2(request.params.id_area)
              .then(([count, fieldData]) => {
                  let totalesV = count[0].num
                  console.log(totalesV)
                    response.render('aprobar_vacaciones_filtro', {
                        area: area,
                        userRol: rol[0].id_rol,
                        vacaciones: vacaciones,
                        current: page,
                        pages: Math.ceil(totalesV / perPage),
                        success: request.flash("success"),
                        error: request.flash("error"),
                        isLoggedIn: request.session.isLoggedIn === true ? true : false
                    });
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};




exports.post_reject_vacaciones = (request, response, next) => {
    console.log('POST /dlc/a_vacacionesp/:page/reject');
    const estatus_vacaciones = "Rechazado";
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
      const estatus_vacaciones = "Aprobado";
      var dias_solicitados = request.body.dias_solicitados;
      const folio = request.body.folio;
      const no_empleado = request.body.no_empleado;

      console.log(estatus_vacaciones);
      console.log(dias_solicitados);
      console.log(folio);
      console.log(no_empleado);

      Empleado.getVacacionesR(no_empleado)
      .then(([rows, fielData])=>{
          Empleado.getVacacionesEspeciales(no_empleado)
          .then(([rows2, fielData])=>{
          var dias_vacaciones_restantes = rows[0].dias_vacaciones_restantes;
          var dias_vacaciones_especiales = rows2[0].dias_vacaciones_especiales;
          const total_dias_vacaciones = dias_vacaciones_restantes + dias_vacaciones_especiales;

          if (total_dias_vacaciones < dias_solicitados){
            request.flash('error', 'Este Usuario no posee días de vacaciones');
            response.redirect('/dlc/a_vacacionesp/1');
          }

          else {
            if (dias_vacaciones_especiales > 0){
              while (dias_vacaciones_especiales != 0 && dias_solicitados != 0){
                dias_vacaciones_especiales -= 1;
                dias_solicitados -=1;
              }
              if (dias_solicitados > 0){
                while (dias_vacaciones_restantes != 0 && dias_solicitados != 0){
                  dias_vacaciones_restantes -= 1;
                  dias_solicitados -=1;
                }
              }
              Vacaciones
                .aproveeVacationsSpecial(estatus_vacaciones, dias_vacaciones_restantes, dias_vacaciones_especiales, folio, no_empleado)
                .then(() => {
                    console.log("Se aprobo la solicitud");
                    request.flash('success', 'La solicitud con folio ' + folio + ' fue APROBADA con éxito');
                    response.redirect('/dlc/a_vacacionesp/1');
                    }).catch(err => console.log(err));
            }

            else {
              Vacaciones
                .aproveeVacations(estatus_vacaciones, dias_solicitados, folio, no_empleado)
                .then(() => {
                    console.log("Se aprobo la solicitud");
                    request.flash('success', 'La solicitud con folio ' + folio + ' fue APROBADA con éxito');
                    response.redirect('/dlc/a_vacacionesp/1');
                    }).catch(err => console.log(err));
                }
            }
        }).catch(err => console.log(err));
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
    const no_empleado = request.session.user_no_empleado;
    console.log('GET /dlc/vacaciones_totales');
    Empleado.getRol(no_empleado)
        .then(([rol, fieldData]) => {
        Prestaciones.fetchAll()
        .then(([rows, fieldData]) => {
          response.render('modificar_vacaciones_totales', {
              userRol: rol[0].id_rol,
              prestaciones: rows,
              success: request.flash("success"),
              error: request.flash("error"),
              isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};

exports.post_dias_vacaciones_totales = (request, response, next) => {
    console.log('POST /dlc/a/:id_prestaciones');
    const max_prestaciones = request.body.max_prestaciones;
    const min_prestaciones = request.body.min_prestaciones;
    const dias_prestaciones = request.body.dias_prestaciones;
    const id_prestaciones = request.body.id_prestaciones;

    console.log(max_prestaciones);
    console.log(min_prestaciones);
    console.log(dias_prestaciones);
    console.log(id_prestaciones);

    Prestaciones
      .updatePrestaciones(
        max_prestaciones,
        min_prestaciones,
        dias_prestaciones,
        id_prestaciones)
      .then(() => {
          console.log("Se Actualizaron las prestaciones");
          request.flash('success', 'Se actualizó con éxito');
          response.redirect('/dlc/vacaciones_totales');
      }).catch(err => console.log(err));
  };

  exports.post_delete_vacaciones_totales = (request, response, next) => {
      console.log('POST /dlc/vacaciones_totales/delete/:id_prestaciones');
      const id_prestaciones = request.body.id_prestaciones;
      console.log(id_prestaciones);
      Prestaciones
        .deletePrestaciones(
          id_prestaciones)
        .then(() => {
            console.log("Se elimino una de las prestaciones");
            request.flash('success', 'Se eliminó la fila con éxito');
            response.redirect('/dlc/vacaciones_totales');
        }).catch(err => console.log(err));
    };

    exports.post_add_vacaciones_totales = (request, response, next) => {
        console.log('POST /dlc/vacaciones_totales/add');
        const max_prestaciones = request.body.max_prestaciones;
        const min_prestaciones = request.body.min_prestaciones;
        const dias_prestaciones = request.body.dias_prestaciones;

        console.log(max_prestaciones);
        console.log(min_prestaciones);
        console.log(dias_prestaciones);

        if (max_prestaciones.length == 0 && min_prestaciones.length == 0 && dias_prestaciones.length == 0){
          request.flash('error', 'No se recibió ningún dato.');
          response.redirect('/dlc/vacaciones_totales');
        }

        else if (max_prestaciones.length == 0 || min_prestaciones.length == 0 || dias_prestaciones.length == 0){
          request.flash('error', 'Faltan datos por llenar.');
          response.redirect('/dlc/vacaciones_totales');
        }

        else {
          const prestaciones =
              new Prestaciones(
                max_prestaciones,
                min_prestaciones,
                dias_prestaciones,
                );
            prestaciones.save()
          .then(() => {
              console.log("Se guardaron las prestaciones");
              request.flash('success', 'Se agregaron correctamente las actualizaciones');
              response.redirect('/dlc/vacaciones_totales');
            })
            .catch(err => console.log(err));
          }
        };

        //------------------------Dar dias de vacaciones (perfil)--------------------------------
        exports.post_give_vacations = (request, response, next) => {
            console.log('POST /dlc/buscar_empleado/:no_empleado/vacaciones');
            console.log(request.body);
            var giveVacations = request.body.giveVacations;
            const no_empleado = request.body.no_empleado;

            console.log(giveVacations);
            console.log(no_empleado);

            Empleado.getVacacionesEspeciales(no_empleado)
            .then(([rows, fielData])=>{
              var dias_vacaciones_especiales = rows[0].dias_vacaciones_especiales;
              const total_dias_vacaciones = dias_vacaciones_especiales + giveVacations;

              if (giveVacations === 0 && no_empleado.length == 0 ){
                request.flash('error', 'No se recibió ningún dato.');
                response.redirect('/dlc/buscar_empleado/'+ no_empleado);
              }

              else if (giveVacations === 0 && no_empleado.length == 0 ){
                request.flash('error', 'Faltan datos por llenar.');
                response.redirect('/dlc/buscar_empleado/'+ no_empleado);
              }

              else if (total_dias_vacaciones > 5){
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
          }).catch(err => console.log(err));
        };
        //-------------------------Dar dias de vacaciones (perfil)---------------------------------

        //------------------------Consultar Vacacciones solicitadas--------------------------------
        exports.get_vacaciones_solicitadas = (request, response, next) => {
            const no_empleado = request.session.user_no_empleado;
            console.log('GET /dlc/profile/vacaciones_solicitadas');
            console.log(request.params.no_empleado);//
            console.log(request.session.user_no_empleado);//
            Empleado.getRol(no_empleado)
                .then(([rol, fieldData]) => {

                Vacaciones.fetchSome(no_empleado)
                .then(([rows, fieldData]) => {
                  console.log(rows);
                  response.render('vacaciones_solicitadas', {
                      userRol: rol[0].id_rol,
                      vacaciones: rows,
                      success: request.flash("success"),
                      error: request.flash("error"),
                      isLoggedIn: request.session.isLoggedIn === true ? true : false
                    });
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
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

        //------------------------Modificar dias de vacaciones totales--------------------------------
