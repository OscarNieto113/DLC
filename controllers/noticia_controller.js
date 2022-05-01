const Noticia = require('../models/noticia');

//------------------------POST Subir una noticia--------------------------------
exports.post_noticia = (request, response, next) => {
    console.log('POST /dlc/noticia');
    const filename = request.file.filename;

    console.log(filename);
    if (filename == undefined){
        request.flash('error', 'No se recibió ningún archivo.');
        response.redirect('/dlc');
    }

    else {
        const noticia =
            new Noticia(
            filename);

        noticia.save()
        .then(() => {
            console.log("Se guardo la publicacion");
            request.flash('success', 'La noticia fue agregado con éxito');
            response.redirect('/dlc');
        })
        .catch((error)=>{console.log(error)});
    }
};

//------------------------POST delete noticia--------------------------------
exports.post_delete_noticia = (request, response, next) => {
    console.log('POST /dlc/noticia/delete/:id_noticia');
    const id_noticia = request.body.id_noticia;
    Noticia.deleteNoticia(id_noticia)
    .then(() => {
        console.log("Se elimino la Noticia");
        request.flash('success', 'La noticia se eliminó con éxito');
        response.redirect('/dlc');
    }).catch(err => console.log(err));
};
