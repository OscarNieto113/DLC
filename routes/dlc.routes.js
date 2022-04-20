const express = require('express');
const router = express.Router();
const multer = require('multer');
const isAuth = require('../util/is-auth.js');

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
router.get('/solicitar_ng_block', isAuth, dlc_controller.get_solicitar_ng_block);
router.post('/solicitar_ng_block', isAuth, dlc_controller.post_solicitar_ng_block);

//Aprobar NG BLOCK
router.get('/a_ng_blocksp/:page', isAuth, dlc_controller.get_aprobar_ng_blocks_pagination);
router.get('/a_ng_blocksp_filtro/departamento/:id_area/page/:page', isAuth, dlc_controller.get_aprobar_ngblocks_filtro);
router.post('/a_ng_blocksp/:page/aprovee', isAuth, dlc_controller.post_aprovee_ng_blocks);
router.post('/a_ng_blocksp/:page/reject', isAuth, dlc_controller.post_reject_ng_blocks);
router.get('/a_ng_blocksp/:page/filtrar/:search', isAuth, dlc_controller.search_ngblock);

//Solicitar Vacaciones
router.get('/s_vacaciones', isAuth, dlc_controller.get_solicitar_vacaciones);
router.post('/s_vacaciones', isAuth, dlc_controller.post_solicitar_vacaciones);

//Aprobar Vacaciones
router.get('/a_vacacionesp/:page', isAuth, dlc_controller.get_aprobar_vacaciones_pagination);
router.get('/a_vacacionesp_filtro/departamento/:id_area/page/:page', isAuth, dlc_controller.get_aprobar_vacaciones_filtro);
router.post('/a_vacacionesp/:page/reject', isAuth, dlc_controller.post_reject_vacaciones);
router.post('/a_vacacionesp/:page/aprovee', isAuth, dlc_controller.post_aprovee_vacaciones);
router.get('/a_vacacionesp/:page/filtrar/:search', isAuth, dlc_controller.search_vacaciones);

//Registrar Empleado
router.get('/r_usuario', isAuth, dlc_controller.get_registrar_empleado);
router.post('/r_usuario', isAuth, dlc_controller.post_registrar_empleado);
router.post('/r_usuario/departamento', isAuth, dlc_controller.post_registrar_departamento);
router.post('/r_usuario/ciudad', isAuth, dlc_controller.post_registrar_ciudad);

//Buscar Empelado
router.get('/buscar_empleado', isAuth, dlc_controller.get_buscar_empleado);
router.get('/s_buscar_empleadop/filtrar/:search', isAuth, dlc_controller.search_empleado);
router.get('/buscar_empleado/:no_empleado', dlc_controller.get_perfil_empleado);
//router.post('/buscar_empleado', dlc_controller.post_buscar_empleado);

//Interfaz datos del empleado
router.get('/profile', isAuth, dlc_controller.get_profile);

//Dar dias de vacaciones
router.post('/buscar_empleado/:no_empleado/vacaciones', isAuth, dlc_controller.post_give_vacations);

//Dar Ng Blocks
router.post('/buscar_empleado/:no_empleado/ng_blocks', isAuth, dlc_controller.post_give_ng_blocks);

//Modificar el rol del chango
router.post('/buscar_empleado/:no_empleado/m_rol', isAuth, dlc_controller.post_give_new_rol);

//Reporte NPS
//router.get('/reportes_mensuales', dlc_controller.get_reportes_mensuales);

//Modificar dias de vacaciones Totales
router.get('/vacaciones_totales', isAuth, dlc_controller.get_dias_vacaciones_totales);
router.post('/vacaciones_totales/:id_prestaciones', isAuth, dlc_controller.post_dias_vacaciones_totales);
router.post('/vacaciones_totales/delete/:id_prestaciones', isAuth, dlc_controller.post_delete_vacaciones_totales);
router.post('/vacaciones_totales/add/aaaaaaa', isAuth, dlc_controller.post_add_vacaciones_totales);

//Ver solicitud de tus vacaciones
router.get('/profile/vacaciones_solicitadas', isAuth, dlc_controller.get_vacaciones_solicitadas);
router.post('/profile/vacaciones_solicitadas/delete/:folio', isAuth, dlc_controller.post_delete_vacaciones_solicitadas);

//Ver solicitud de tus NG Block
router.get('/profile/ngblocks_solicitados', isAuth, dlc_controller.get_ngblocks_solicitados);
router.post('/profile/ngblocks_solicitados/delete/:id_ng_block', isAuth, dlc_controller.post_delete_ng_block_solicitadas);

//MAIN INDEX
//router.post('/objetivo', dlc_controller.post_objetivo);
router.post('/noticia' , multer({ storage: fileStorage }).single('imagen_noticia'), dlc_controller.post_noticia);
router.post('/publicacion' , multer({ storage: fileStorage }).single('imagen_publicacion'), dlc_controller.post_publicacion);
router.post('/publicacion-sin-imagen',isAuth, dlc_controller.post_publicacion_sin_imagen);
router.post('/publicacion/delete/:id_publicacion', isAuth, dlc_controller.post_delete_publicacion);
//router.post('/reportes_mensuales/post',multer({ storage: fileStorage }).single('imagen_reporte'),dlc_controller.post_reportes_mensuales);
router.post('/noticia/delete/:id_noticia', isAuth, dlc_controller.post_delete_noticia);

router.use('/', isAuth, dlc_controller.listar);

module.exports = router;
