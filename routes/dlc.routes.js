const express = require('express');
const router = express.Router();
const multer = require('multer');

const dlc_controller = require('../controllers/dlc_controller');

const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        //'uploads': Es el directorio del servidor donde se subirán los archivos
        callback(null, 'uploads');
    },
    filename: (request, file, callback) => {
        //aquí configuramos el nombre que queremos que tenga el archivo en el servidor,
        //para que no haya problema si se suben 2 archivos con el mismo nombre concatenamos el timestamp
        callback(null, new Date().getTime()+ '-' + file.originalname);
    },
});

//Solicitar NG BLOCK
router.get('/s_ng_block', dlc_controller.get_s_ng_block);
router.post('/s_ng_block', dlc_controller.post_s_ng_block);

//Aprobar NG BLOCK
router.get('/a_ng_block', dlc_controller.get_a_ng_block);
router.post('/a_ng_block', dlc_controller.post_a_ng_block);

//Solicitar Vacaciones
router.get('/s_vacaciones', dlc_controller.get_solicitud_vacaciones);
router.post('/s_vacaciones', dlc_controller.post_solicitud_vacaciones);

//Aprobar Vacaciones
router.get('/a_vacacionesp/:page', dlc_controller.get_aprobar_vacaciones_pagination);
router.post('/a_vacacionesp/:page/reject', dlc_controller.post_reject_vacaciones);
router.post('/a_vacacionesp/:page/aprovee', dlc_controller.post_aprovee_vacaciones);
router.get('/a_vacacionesp/:page/filtrar/:search', dlc_controller.search_vacaciones);

//Registrar Empleado
router.get('/r_usuario', dlc_controller.get_registrar_empleado);
router.post('/r_usuario', dlc_controller.post_registrar_empleado);

//Buscar Empelado
router.get('/buscar_empleado', dlc_controller.get_buscar_empleado);
//router.post('/buscar_empleado', dlc_controller.post_buscar_empleado);

//Interfaz datos del empleado
router.get('/profile', dlc_controller.get_profile);

//Reporte NPS
router.get('/nps', dlc_controller.get_nps);

//Ver solicitud de tus vacaciones
router.get('/profile/vacaciones_solicitadas', dlc_controller.get_vacaciones_solicitadas);

//Ver solicitud de tus NG Block
router.get('/profile/ngblocks_solicitados', dlc_controller.get_ngblocks_solicitados);

//MAIN INDEX
//router.post('/objetivo', dlc_controller.post_objetivo);
router.post('/noticia',multer({ storage: fileStorage }).single('imagen_noticia') ,dlc_controller.post_noticia);
router.post('/publicacion', multer({ storage: fileStorage }).single('imagen_publicacion'),dlc_controller.post_publicacion);
router.use('/', dlc_controller.listar);


module.exports = router;
