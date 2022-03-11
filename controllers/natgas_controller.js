const path = require('path');
//const Natgas = require('../models/natgas');
//const Area = require('../models/area');
//const Cumpleanios_mes = require('../models/cumpleanios_mes');
//const Empleado_area = require('../models/empleado_area');
//const Empleado = require('../models/empleado');
//const Evento = require('../models/evento');
//const Ng_Block = require('../models/ng_Block');
//const Noticia = require('../models/noticia');
//const Objetivo = require('../models/objetivo');
//const Permiso_informal = require('../models/permiso_informal');
//const Prestaciones = require('../models/prestaciones');
//const Publicacion = require('../models/publicacion');
//const Referidos = require('../models/referidos');
//const Vacaciones = require('../models/vacaciones');

//Ventana principal de Natgas
//exports.listar = (request, response, next) => {
//    response.sendFile(path.join(__dirname, '..', 'views', 'lista.ejs'));
//};

exports.listar = (request, response, next) => {
    console.log('Ruta /DLC');
    response.render('lista');
}

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
