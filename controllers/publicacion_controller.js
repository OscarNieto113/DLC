const Publicacion = require('../models/publicacion');

//------------------------POST Subir una publicacion--------------------------------
exports.post_publicacion = (request, response, next) => {
    console.log('POST /dlc/publicacion');

    const titulo_publicacion = request.body.titulo_publicacion;
    const descripcion_publicacion = request.body.descripcion_publicacion;
    const filename = request.file.filename;

    console.log(titulo_publicacion);
    console.log(descripcion_publicacion);
    console.log(filename);

    if (titulo_publicacion.length == 0 && descripcion_publicacion.length == 0 && filename.length == undefined){
        request.flash('error1', 'No se recibió ningún dato.');
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
        .catch((error)=>{console.log(error)});
    }
};

//------------------------POST Subir una publicacion sin imagen--------------------------------
exports.post_publicacion_sin_imagen = (request, response, next) => {
    console.log('POST /dlc/publicacion-sin-imagen');
    const titulo_publicacion = request.body.titulo_publicacion;
    const descripcion_publicacion = request.body.descripcion_publicacion;
    const imagen_publicacion = request.body.imagen_publicacion;

    console.log(titulo_publicacion);
    console.log(descripcion_publicacion);
    console.log(imagen_publicacion);

    if (titulo_publicacion.length == 0 && descripcion_publicacion.length == 0){
        request.flash('error1', 'No se recibió ningún dato.');
        response.redirect('/dlc');
    }

    else if (titulo_publicacion.length == 0 || descripcion_publicacion.length == 0){
        request.flash('error1', 'Faltan datos por llenar.');
        response.redirect('/dlc');
    }

    else {
        const publicacion =
        new Publicacion(
            titulo_publicacion,
            descripcion_publicacion,
            imagen_publicacion,
        );
        publicacion.save()
        .then(() => {
            console.log("Se guardo la publicacion");
            request.flash('success1', 'La publicación ' + titulo_publicacion + ' fue agregado con éxito');
            response.redirect('/dlc');
        })
        .catch((error)=>{console.log(error)});
    }
};

//------------------------DELETE publicacion--------------------------------
exports.post_delete_publicacion = (request, response, next) => {
    console.log('POST /dlc/publicacion/delete/:id_publicacion');
    const id_publicacion = request.body.id_publicacion;
    Publicacion.deletePublicacion(id_publicacion)
    .then(() => {
        console.log("Se elimino el anuncio");
        request.flash('success', 'El anuncio se eliminó con éxito');
        response.redirect('/dlc');
    }).catch(err => console.log(err));
};
