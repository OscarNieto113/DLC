exports.post_nuevo = (request, response, next) => {
    console.log('POST /capybaras/nuevo');
    console.log(request.body);
    const capybara =
        new Capybara(request.body.nombre, request.body.descripcion, request.body.imagen);
    capybara.save()
        .then(() => {
            request.session.info = capybara.nombre + ' fue registrado con éxito';
            response.setHeader('Set-Cookie', 
                'ultimo_capybara='+capybara.nombre+'; HttpOnly');
            response.redirect('/capybaras');
        })
        .catch(err => console.log(err));
};
