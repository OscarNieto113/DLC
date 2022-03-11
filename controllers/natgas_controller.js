const path = require('path');
const natgas = require('../models/natgas');

exports.cerveza = (request, response, next) => {
    response.sendFile(path.join(__dirname, '..', 'views', 'cerveza_view.html'));
};

// exports.get_nuevo = (request, response, next) => {
//     console.log('GET /capybaras/nuevo');
//     response.render('nuevo', {nombre: 'Lalo'}); 
// };

// exports.post_nuevo = (request, response, next) => {
//     console.log('POST /capybaras/nuevo');
//     console.log(request.body);
//     const capybara = new Capybara(request.body.nombre);
//     capybara.save();
//     response.redirect('/capybaras');
// };

// exports.listar = (request, response, next) => {
//     console.log('Ruta /capybaras');
//     response.render('lista', {capybaras: Capybara.fetchAll()}); 
// }