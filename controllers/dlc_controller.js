const Area = require('../models/area');
const Empleado = require('../models/empleado');
const Noticia = require('../models/noticia');
const Objetivo = require('../models/objetivo');
const Publicacion = require('../models/publicacion');
const Prestaciones = require('../models/prestaciones');
const Ciudad = require('../models/ciudad');
const Rol = require('../models/rol');


//------------------------Registrar empleado--------------------------------
exports.get_registrar_empleado = (request, response, next) => {
    const no_empleado = request.session.user_no_empleado;
    console.log('GET /dlc/registrar_empleado');
    Empleado.getRol(no_empleado)
    .then(([rol, fieldData]) => {
        Rol.fetchAll()
        .then(([roles, fieldData]) => {
            Area.fetchAll()
            .then(([area, fieldData]) => {
                Ciudad.fetchAll()
                .then(([ciudad, fieldData]) => {
                    response.render('registrar_empleado', {
                        userRol: rol[0].id_rol,
                        ciudad: ciudad,
                        rol: roles,
                        area: area,
                        success: request.flash("success"),
                        error: request.flash("error"),
                        isLoggedIn: request.session.isLoggedIn === true ? true : false
                    });
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};

exports.post_registrar_empleado = (request, response, next) => {
    console.log('POST /dlc/registrar_empleado');
    const no_empleado = request.body.no_empleado;
    const ng_blocks_restantes = request.body.ng_blocks_restantes;
    const fecha_contratacion = request.body.fecha_contratacion;
    const fecha_nacimiento = request.body.fecha_nacimiento;
    const correo_empresarial = request.body.correo_empresarial;
    const nombres_empleados = request.body.nombres_empleados;
    const apellido_paterno = request.body.apellido_paterno;
    const apellido_materno = request.body.apellido_materno;
    const dias_vacaciones_restantes = request.body.dias_vacaciones_restantes;
    const genero_empleado = request.body.genero_empleado;
    const id_area = request.body.id_area;
    const id_rol = request.body.id_rol;
    const id_ciudad = request.body.id_ciudad;

    console.log(no_empleado);
    console.log(ng_blocks_restantes);
    console.log(fecha_contratacion);
    console.log(fecha_nacimiento);
    console.log(correo_empresarial);
    console.log(nombres_empleados);
    console.log(apellido_paterno);
    console.log(apellido_materno);
    console.log(dias_vacaciones_restantes);
    console.log(genero_empleado);
    console.log(id_area);
    console.log(id_rol);
    console.log(id_ciudad);

    if (no_empleado.length == 0 && ng_blocks_restantes.length == 0 && fecha_contratacion.length == 0 &&
        fecha_nacimiento.length == 0 && correo_empresarial.length == 0 && nombres_empleados.length == 0 &&
        apellido_paterno.length == 0 && apellido_materno.length == 0 && dias_vacaciones_restantes.length == 0 &&
        genero_empleado.length == 0 && id_area.length == 0 && id_rol.length == 0){
      request.flash('error', 'No se recibió ningún dato.');
      response.redirect('/dlc/r_usuario');
    }

    else if (no_empleado.length == 0 || ng_blocks_restantes.length == 0 || fecha_contratacion.length == 0 ||
        fecha_nacimiento.length == 0 || correo_empresarial.length == 0 || nombres_empleados.length == 0 ||
        apellido_paterno.length == 0 || apellido_materno.length == 0 || dias_vacaciones_restantes.length == 0 ||
        genero_empleado.length == 0 || id_area.length == 0 || id_rol.length == 0){
          request.flash('error', 'Faltan datos por llenar.');
          response.redirect('/dlc/r_usuario');
    }

    else if (id_rol == 5){
      const ng_blocks_restantes1 = 0
      const empleado =
          new Empleado(
            no_empleado,
            ng_blocks_restantes1,
            fecha_contratacion,
            fecha_nacimiento,
            correo_empresarial,
            nombres_empleados,
            apellido_paterno,
            apellido_materno,
            dias_vacaciones_restantes,
            genero_empleado,
            id_area,
            id_rol,
            id_ciudad
          );
      empleado.save()
      .then(() => {
          console.log("Se registro correctamente el empleado");
          request.flash('success', 'El empleado se registro con éxito');
          response.redirect('/dlc/r_usuario');
        })
        .catch(err => console.log(err));
      }

      else {
        const empleado =
            new Empleado(
              no_empleado,
              ng_blocks_restantes,
              fecha_contratacion,
              fecha_nacimiento,
              correo_empresarial,
              nombres_empleados,
              apellido_paterno,
              apellido_materno,
              dias_vacaciones_restantes,
              genero_empleado,
              id_area,
              id_rol,
              id_ciudad
            );
        empleado.save()
        .then(() => {
            console.log("Se registro correctamente el empleado");
            request.flash('success', 'El empleado se registro con éxito');
            response.redirect('/dlc/r_usuario');
          })
          .catch(err => console.log(err));
        }
    };

exports.post_registrar_departamento = (request, response, next) => {
    console.log('POST /dlc/r_usuario/departamento');
    const nombre_departamento = request.body.nombre_departamento;
        if (nombre_departamento.length == 0){
          request.flash('error', 'No se recibió ningún dato.');
          response.redirect('/dlc/r_usuario');
        }
        else {
            const area =
            new Area(
              nombre_departamento);
              area.save()
            .then(() => {
                console.log("Se guardo la publicacion");
                request.flash('success', 'El departamento fue agregado con éxito');
                response.redirect('/dlc/r_usuario');
            })
        .catch((error)=>{console.log(error)});
    }
};

//------------------------Registrar Ciudad---------------------------------
    exports.post_registrar_ciudad = (request, response, next) => {
      console.log('POST /dlc/r_usuario/departamento');
      const nombre_ciudad = request.body.nombre_ciudad;
      console.log(nombre_ciudad);
          if (nombre_ciudad.length == 0){
            request.flash('error', 'No se recibió ningún dato.');
            response.redirect('/dlc/r_usuario');
          }
          else {
            const ciudad =
                new Ciudad(
                  nombre_ciudad,
                  );
            ciudad.save()
            .then(() => {
                console.log("Se guardo la ciudad");
                request.flash('success', 'La ciudad fue agregado con éxito');
                response.redirect('/dlc/r_usuario');
            })
            .catch((error)=>{console.log(error)});
          }
  };

//------------------------Consultar informacion personal (perfil)--------------------------------
exports.get_profile = (request, response, next) => {
    const no_empleado = request.session.user_no_empleado;
    console.log('Ruta /dlc/:no_empleado');
    console.log(request.session.user_no_empleado);
    console.log(request.cookies);
    console.log('Ruta /dlc/:no_empleado');
    const info = request.session.info ? request.session.info : '';
    request.session.info = '';
    Empleado.getRol(no_empleado)
        .then(([rol, fieldData]) => {
        Empleado.fetchEmpleadoAll(no_empleado)
            .then(([rows, fieldData]) => {
              Empleado.getRol(no_empleado)
                  .then(([rol2, fieldData]) => {
                console.log(rows);
                response.render('profile', {
                    userRol: rol[0].id_rol,
                    userRol2: rol2[0].id_rol,
                    no_empleado: request.session.user_no_empleado,
                    empleado: rows,
                    success: request.flash("success"),
                    error: request.flash("error"),
                    success1: request.flash("success1"),
                    error1: request.flash("error1"),
                    isLoggedIn: request.session.isLoggedIn === true ? true : false
                  });
              }).catch(err => console.log(err));
          }).catch(err => console.log(err));
      }).catch(err => console.log(err));
  };

//------------------------Consultar el perfil de otro empleado---------------------------------
exports.get_perfil_empleado = (request, response, next) => {
  const no_empleado1 = request.session.user_no_empleado;
  Empleado.getRol(no_empleado1)
      .then(([rol, fieldData]) => {
      Empleado.fetchEmpleadoAll(request.params.no_empleado)
          .then(([rows, fieldData]) => {
            Empleado.getRol(request.params.no_empleado)
                .then(([rol2, fieldData]) => {
                  Rol.fetchAll()
                      .then(([rows2, fieldData]) => {
                        console.log(rows)
                        response.render('profile', {
                          no_empleado: request.session.user_no_empleado,
                          userRol: rol[0].id_rol,
                          userRol2: rol2[0].id_rol,
                          empleado: rows,
                          rol: rows2,
                          success: request.flash("success"),
                          error: request.flash("error"),
                          success1: request.flash("success1"),
                          error1: request.flash("error1"),
                          isLoggedIn: request.session.isLoggedIn === true ? true : false
                        });
              }).catch(err => console.log(err));
            }).catch(err => console.log(err));
          }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    };

//------------------------Buscar empleado (perfil)--------------------------------
exports.get_buscar_empleado = (request, response, next) => {
    const no_empleado = request.session.user_no_empleado;
    console.log('Ruta /dlc/search_empleado');
    Empleado.getRol(no_empleado)
    .then(([rol, fieldData]) => {
        Empleado.search()
            .then(([rows, fieldData]) => {
                console.log(rows);
                response.render('buscar_empleado', {
                    userRol: rol[0].id_rol,
                    empleado: rows,
                    isLoggedIn: request.session.isLoggedIn === true ? true : false
                  });
              }).catch(err => console.log(err));
          }).catch(err => console.log(err));
      };

//------------------------Modificar Rol (perfil)----------------------------------
exports.post_give_new_rol = (request, response, next) => {
    console.log('POST /dlc/buscar_empleado/:no_empleado/m_rol');
    console.log(request.body);
    const n_rol = request.body.n_rol;
    const no_empleado = request.body.no_empleado;

    console.log(n_rol);
    console.log(no_empleado);

      if (n_rol == undefined  ){
        request.flash('error', 'No se recibió ningún dato.');
        response.redirect('/dlc/buscar_empleado/'+ no_empleado);
      }

      else {
        Rol.modifyRol(n_rol, no_empleado)
        .then(() => {
            console.log("Se guardó los cambios");
            request.flash('success', 'El rol de este empleado fue cambiado con éxito');
            response.redirect('/dlc/buscar_empleado/'+ no_empleado);
        })
        .catch(err => console.log(err));
      }
  };

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

//------------------------Main--------------------------------
exports.listar = (request, response, next) => {
    const no_empleado = request.session.user_no_empleado;
    console.log('Ruta /dlc');
    Empleado.getAniosLaborados(no_empleado)
    .then(([aniosLaborados, fieldData]) => {
      var aniosLaborados = aniosLaborados[0].AniosLaborados;
        Prestaciones.fetchAll()
        .then(([prestaciones, fieldData]) => {
          Empleado.getDiasSolicitados(no_empleado)
          .then(([dias_solicitados, fieldData]) => {
            Empleado.getRol(no_empleado)
            .then(([rol, fieldData]) => {
                Noticia.fetchAll()
                .then(([rows, fieldData]) => {
                    Publicacion.fetchAll()
                    .then(([rows2, fieldData]) => {
                        for (let i = 0; i < prestaciones.length; i++){
                           if (aniosLaborados >= prestaciones[i].min_prestaciones && aniosLaborados <= prestaciones[i].max_prestaciones){
                             var dias_vacaciones_restantes = prestaciones[i].dias_prestaciones
                             break;
                          }
                        }
                        for (let i = 0; i < dias_solicitados.length; i++){
                          dias_vacaciones_restantes = dias_vacaciones_restantes - dias_solicitados[i].dias_solicitados;
                        }
                        Empleado.updateDiasVacacionesRestantes(dias_vacaciones_restantes, no_empleado)
                        .then(() => {
                              response.render('main', {
                                  userRol: rol[0].id_rol,
                                  noticia: rows,
                                  success: request.flash("success"),
                                  error: request.flash("error"),
                                  publicacion: rows2,
                                  success1: request.flash("success1"),
                                  error1: request.flash("error1"),
                                  isLoggedIn: request.session.isLoggedIn === true ? true : false
                                });
                            }).catch(err => console.log(err));
                        }).catch(err => console.log(err));
                    }).catch(err => console.log(err));
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};
//------------------------Main--------------------------------
