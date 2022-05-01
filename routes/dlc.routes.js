const express = require('express');
const router = express.Router();
const isAuth = require('../util/is-auth.js');

const dlc_controller = require('../controllers/dlc_controller');
const noticia_controller = require('../controllers/noticia_controller');
const publicacion_controller = require('../controllers/publicacion_controller');
const ng_block_controller = require('../controllers/ng_block_controller');
const vacaciones_controller = require('../controllers/vacaciones_controller');

//NG BLOCK
router.get('/solicitar_ng_block', isAuth, ng_block_controller.get_solicitar_ng_block);
router.post('/solicitar_ng_block', isAuth, ng_block_controller.post_solicitar_ng_block);
router.get('/a_ng_blocksp/:page', isAuth, ng_block_controller.get_aprobar_ng_blocks_pagination);
router.get('/a_ng_blocksp_filtro/departamento/:id_area/page/:page', isAuth, ng_block_controller.get_aprobar_ngblocks_filtro);
router.post('/a_ng_blocksp/:page/aprovee', isAuth, ng_block_controller.post_aprovee_ng_blocks);
router.post('/a_ng_blocksp/:page/reject', isAuth, ng_block_controller.post_reject_ng_blocks);
router.get('/a_ng_blocksp/:page/filtrar/:search', isAuth, ng_block_controller.search_ngblock);
router.post('/buscar_empleado/:no_empleado/ng_blocks', isAuth, ng_block_controller.post_give_ng_blocks);
router.get('/profile/ngblocks_solicitados/:page', isAuth, ng_block_controller.get_ngblocks_solicitados);
router.post('/profile/ngblocks_solicitados/delete/:id_ng_block', isAuth, ng_block_controller.post_delete_ng_block_solicitadas);

//Vacaciones
router.get('/s_vacaciones', isAuth, vacaciones_controller.get_solicitar_vacaciones);
router.post('/s_vacaciones', isAuth, vacaciones_controller.post_solicitar_vacaciones);
router.get('/a_vacacionesp/:page', isAuth, vacaciones_controller.get_aprobar_vacaciones_pagination);
router.get('/a_vacacionesp_filtro/departamento/:id_area/page/:page', isAuth, vacaciones_controller.get_aprobar_vacaciones_filtro);
router.post('/a_vacacionesp/:page/reject', isAuth, vacaciones_controller.post_reject_vacaciones);
router.post('/a_vacacionesp/:page/aprovee', isAuth, vacaciones_controller.post_aprovee_vacaciones);
router.get('/a_vacacionesp/:page/filtrar/:search', isAuth, vacaciones_controller.search_vacaciones);
router.post('/buscar_empleado/:no_empleado/vacaciones', isAuth, vacaciones_controller.post_give_vacations);
router.get('/vacaciones_totales', isAuth, vacaciones_controller.get_dias_vacaciones_totales);
router.post('/vacaciones_totales/:id_prestaciones', isAuth, vacaciones_controller.post_dias_vacaciones_totales);
router.post('/vacaciones_totales/delete/:id_prestaciones', isAuth, vacaciones_controller.post_delete_vacaciones_totales);
router.post('/vacaciones_totales/add/aaaaaaa', isAuth, vacaciones_controller.post_add_vacaciones_totales);
router.get('/profile/vacaciones_solicitadas/:page', isAuth, vacaciones_controller.get_vacaciones_solicitadas);
router.post('/profile/vacaciones_solicitadas/delete/:folio', isAuth, vacaciones_controller.post_delete_vacaciones_solicitadas);


//Registrar Empleado
router.get('/r_usuario', isAuth, dlc_controller.get_registrar_empleado);
router.post('/r_usuario', isAuth, dlc_controller.post_registrar_empleado);
router.post('/r_usuario/departamento', isAuth, dlc_controller.post_registrar_departamento);
router.post('/r_usuario/ciudad', isAuth, dlc_controller.post_registrar_ciudad);

//Buscar Empelado
router.get('/buscar_empleado', isAuth, dlc_controller.get_buscar_empleado);
router.get('/s_buscar_empleadop/filtrar/:search', isAuth, dlc_controller.search_empleado);
router.get('/buscar_empleado/:no_empleado', dlc_controller.get_perfil_empleado);

//Interfaz datos del empleado
router.get('/profile', isAuth, dlc_controller.get_profile);

//Modificar el rol del chango
router.post('/buscar_empleado/:no_empleado/m_rol', isAuth, dlc_controller.post_give_new_rol);

//Noticia
router.post('/noticia', noticia_controller.post_noticia);
router.post('/noticia/delete/:id_noticia', isAuth, noticia_controller.post_delete_noticia);

//Publicacion
router.post('/publicacion', publicacion_controller.post_publicacion);
router.post('/publicacion-sin-imagen',isAuth, publicacion_controller.post_publicacion_sin_imagen);
router.post('/publicacion/delete/:id_publicacion', isAuth, publicacion_controller.post_delete_publicacion);

//MAIN INDEX
router.use('/', isAuth, dlc_controller.listar);

module.exports = router;
