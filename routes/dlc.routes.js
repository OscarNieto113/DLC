const express = require('express');
const router = express.Router();

const dlc_controller = require('../controllers/dlc_controller');


//Solicitar NG BLOCK
router.get('/s_ng_block', dlc_controller.get_s_ng_block);
router.post('/s_ng_block', dlc_controller.post_s_ng_block);

//Aprobar NG BLOCK
router.get('/a_ng_block', dlc_controller.get_a_ng_block);
router.post('/a_ng_block', dlc_controller.post_a_ng_block);

//Solicitar Vacaciones
router.get('/s_vacaciones', dlc_controller.get_s_vacaciones);
router.post('/s_vacaciones', dlc_controller.post_s_vacaciones);

//Aprobar Vacaciones
router.get('/a_vacaciones', dlc_controller.get_a_vacaciones);
router.post('/a_vacaciones', dlc_controller.post_a_vacaciones);

//Registrar Usuario
router.get('/r_usuario', dlc_controller.get_r_usuario);
router.post('/r_usuario', dlc_controller.post_r_usuario);

//Interfaz nueva de usuario
router.get('/d_usuario', dlc_controller.get_d_usuario);

//Reporte NPS
router.get('/nps', dlc_controller.get_nps);

//Ver solicitud de vacaciones
router.get('/d_usuario/v_vacaciones', dlc_controller.get_v_vacaciones);

//Ver solicitud de NG Block
router.get('/d_usuario/v_ng_block', dlc_controller.get_v_ng_block);

//MAIN INDEX
//router.post('/objetivo', dlc_controller.post_objetivo);
router.post('/noticia', dlc_controller.post_noticia);
router.post('/publicacion', dlc_controller.post_publicacion);
router.use('/', dlc_controller.listar);


module.exports = router;
