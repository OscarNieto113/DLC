const path = require('path');
//const Natgas = require('../models/natgas');
//const Area = require('../models/area');
//const Cumpleanios_mes = require('../models/cumpleanios_mes');
//const Empleado_area = require('../models/empleado_area');
//const Empleado = require('../models/empleado');
//const Evento = require('../models/evento');
//const Ng_Block = require('../models/ng_Block');
const Noticia = require('../models/noticia');
//const Objetivo = require('../models/objetivo');
//const Permiso_informal = require('../models/permiso_informal');
//const Prestaciones = require('../models/prestaciones');
//const Publicacion = require('../models/publicacion');
//const Referidos = require('../models/referidos');
//const Vacaciones = require('../models/vacaciones');

//'GET /dlc/vacaciones' = Lo que aparece en la consola
// vacaciones = Archivo que va a renderizar

exports.vacaciones = (request, response, next) => {
    console.log('Ruta /dlc/vacaciones');
    response.render('prueba');
}


//funciona
exports.listar = (request, response, next) => {
    console.log('Ruta /dlc');
    response.render('vacaciones', {noticia: Noticia.fetchAll()});
}

//exports.listar = (request, response, next) => {
//    console.log('Ruta /capybaras');
//    response.render('lista', {capybaras: Capybara.fetchAll()});
//}
