const Area = require('../models/area');
const Empleado = require('../models/empleado');
const Ng_Block = require('../models/ng_block');

//------------------------GET Solicitar NG Block--------------------------------
exports.get_solicitar_ng_block = (request, response, next) => {
    const no_empleado = request.session.user_no_empleado;
    console.log('GET /dlc/solicitar_ng_block');
    Empleado.getRol(no_empleado)
    .then(([rol, fieldData]) => {
        Empleado.getBlocksR(no_empleado)
        .then(([rows, fieldData]) => {
            response.render('solicitar_ng_block', {
                userRol: rol[0].id_rol,
                empleado: rows,
                success: request.flash("success"),
                error: request.flash("error"),
                isLoggedIn: request.session.isLoggedIn === true ? true : false
            });
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};

//------------------------POST Solicitar NG Block--------------------------------
exports.post_solicitar_ng_block = (request, response, next) => {
    const no_empleado = request.session.user_no_empleado;
    const turno_ng_block = request.body.turno_ng_block;
    const descripcion_ng_block = request.body.descripcion_ng_block;
    const fecha_uso_ng_block = request.body.fecha_uso_ng_block;
    const fecha_ng = request.body.fecha_ng;

    console.log(no_empleado);
    console.log(turno_ng_block);
    console.log(descripcion_ng_block);
    console.log(fecha_uso_ng_block);
    console.log(fecha_ng);

    Empleado.getBlocksR(no_empleado)
    .then(([rows, fielData])=>{
        const ng_blocks_restantes = rows[0].ng_blocks_restantes;
        if (turno_ng_block.length == 0 && descripcion_ng_block.length == 0 && fecha_uso_ng_block.length == 0){
          request.flash('error', 'No se recibió ningún dato.');
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
              request.flash('success', 'El NG Block con fecha de uso de ' + fecha_ng + ' fue agregado con éxito');
              response.redirect('/dlc/solicitar_ng_block');
            })
            .catch(err => console.log(err));
        }
    }).catch((error)=>{console.log(error)});
};

//------------------------GET Aprobar NG Block--------------------------------
exports.get_aprobar_ng_blocks_pagination = (request, response, next) => {
    const no_empleado = request.session.user_no_empleado;
    console.log('GET /dlc/a_ng_blocksp/:page');
    var perPage = 10;
    var page = request.params.page || 1;

    Empleado.getRol(no_empleado)
    .then(([rol, fieldData]) => {
        console.log(rol[0].id_rol)
        const userRol = rol[0].id_rol;

        if (userRol === 3 ){
            Empleado.getDeparatamento(no_empleado)
            .then(([departamento, fieldData]) => {
              const depar = departamento[0].id_area;
                Empleado.getCiudad(no_empleado)
                .then(([ciudad, fieldData]) => {
                  const estado = ciudad[0].id_ciudad;
                    Area.fetchAll()
                    .then(([area, fieldData]) => {
                        Ng_Block.fetchPagination2(depar, estado, no_empleado, perPage, ((perPage * page) - perPage))
                        .then(([ng_block, fieldData]) => {
                            Ng_Block.count3(depar, estado, empleado)
                            .then(([count, fieldData]) => {
                                const depar = departamento[0].id_area;
                                const estado = ciudad[0].id_ciudad;
                                let totalesN = count[0].num;
                                response.render('aprobar_ngblocks', {
                                    area: area,
                                    userRol: rol[0].id_rol,
                                    ng_block: ng_block,
                                    current: page,
                                    pages: Math.ceil(totalesN / perPage),
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

        else{
            Area.fetchAll()
            .then(([area, fieldData]) => {
                Ng_Block.fetchPagination(no_empleado, perPage, ((perPage * page) - perPage))
                .then(([ng_block, fieldData]) => {
                    Ng_Block.count(no_empleado)
                    .then(([count, fieldData]) => {
                        let totalesN = count[0].num;
                        response.render('aprobar_ngblocks', {
                            area: area,
                            userRol: rol[0].id_rol,
                            ng_block: ng_block,
                            current: page,
                            pages: Math.ceil(totalesN / perPage),
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

//------------------------GET Aprobar NG Block FILTRO POR DEPARTAMENTO--------------------------------
exports.get_aprobar_ngblocks_filtro = (request, response, next) => {
    const no_empleado = request.session.user_no_empleado;
    console.log('GET dlc/a_ngblocks/departamento/:id_area');
    var perPage = 10;
    var page = request.params.page || 1;
    Area.fetchAll()
    .then(([area, fieldData]) => {
        Empleado.getRol(no_empleado)
        .then(([rol, fieldData]) => {
            Ng_Block.fetchFiltro(perPage, ((perPage * page) - perPage), request.params.id_area)
            .then(([ng_block, fieldData]) => {
                Ng_Block.count2(request.params.id_area)
                .then(([count, fieldData]) => {
                    let totalesN = count[0].num
                    response.render('aprobar_ngblocks_filtro', {
                        area: area,
                        userRol: rol[0].id_rol,
                        ng_block: ng_block,
                        current: page,
                        pages: Math.ceil(totalesN / perPage),
                        success: request.flash("success"),
                        error: request.flash("error"),
                        isLoggedIn: request.session.isLoggedIn === true ? true : false
                    });
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};

//------------------------POST Rechazar NG Block--------------------------------
exports.post_reject_ng_blocks = (request, response, next) => {
    console.log('POST /dlc/a_ng_blocksp/:page/reject');
    const estatus_ng_block = "Rechazado";
    const id_ng_block = request.body.id_ng_block;

    Ng_Block.rejectNGBlock(
        estatus_ng_block,
        id_ng_block)
    .then(() => {
        console.log("Se rechazo la solicitud");
        request.flash('success', 'El NG Block con folio ' + id_ng_block + ' fue RECHAZADO con éxito');
        response.redirect('/dlc/a_ng_blocksp/1');
    }).catch(err => console.log(err));
};

//------------------------POST Aprovar NG Block--------------------------------
exports.post_aprovee_ng_blocks = (request, response, next) => {
    console.log('POST /dlc/a_ng_blocksp/:page/aprovee');
    const estatus_ng_block = "Aprobado";
    const id_ng_block = request.body.id_ng_block;
    const no_empleado = request.body.no_empleado;

    console.log(estatus_ng_block);
    console.log(id_ng_block);
    console.log(no_empleado);
    Empleado.getBlocksR(no_empleado)
    .then(([rows, fielData])=>{
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
                console.log("Se aprobó la solicitud");
                request.flash('success', 'El NG Block con folio ' + id_ng_block + ' fue APROBADO con éxito');
                response.redirect('/dlc/a_ng_blocksp/1');
            }).catch(err => console.log(err));
        }
    }).catch((error)=>{console.log(error)});
};

//------------------------POST Buscar NG Block Pasados--------------------------------
exports.search_ngblock = (request, response, next) => {
    console.log(request.params.search);
    Ng_Block.fetchSearch(request.params.search)
    .then(([rows, fieldData]) => {
        response.status(200).json(rows);
        }).catch(err => {console.log(err);
    });
};

//------------------------Consultar NG Blocks solicitadas--------------------------------
exports.get_ngblocks_solicitados = (request, response, next) => {
    const no_empleado = request.session.user_no_empleado;
    console.log('GET /dlc/profile/vacaciones_solicitadas');
    var perPage = 9;
    var page = request.params.page || 1;

    Empleado.getRol(no_empleado)
    .then(([rol, fieldData]) => {
        Ng_Block.fetchSome(no_empleado, perPage, ((perPage * page) - perPage))
        .then(([rows, fieldData]) => {
            Ng_Block.count4(no_empleado)
            .then(([count, fieldData]) => {
                let totalesN = count[0].num;
                response.render('ngblocks_solicitados', {
                    userRol: rol[0].id_rol,
                    ng_block: rows,
                    current: page,
                    pages: Math.ceil(totalesN / perPage),
                    success: request.flash("success"),
                    error: request.flash("error"),
                    isLoggedIn: request.session.isLoggedIn === true ? true : false
                });
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));
};

//------------------------POST DELETE NG Block solicitados--------------------------------
exports.post_delete_ng_block_solicitadas = (request, response, next) => {
    console.log('POST /dlc/profile/ngblocks_solicitados/delete/:id_ng_block');
    const id_ng_block = request.body.id_ng_block;
    const no_empleado = request.session.user_no_empleado;
    Ng_Block.getEstatus(no_empleado, id_ng_block)
    .then(([rows, fielData])=>{
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
    }).catch((error)=>{console.log(error)});
};

//------------------------Dar Ng Blocks (perfil)--------------------------------
exports.post_give_ng_blocks = (request, response, next) => {
    console.log('POST /dlc/buscar_empleado/:no_empleado/ng_blocks');
    const giveNgBlocks = request.body.giveNgBlocks;
    const no_empleado = request.body.no_empleado;

    console.log(giveNgBlocks);
    console.log(no_empleado);

    if (giveNgBlocks === 0 && no_empleado.length == 0 ){
        request.flash('error', 'No se recibió ningún dato.');
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
