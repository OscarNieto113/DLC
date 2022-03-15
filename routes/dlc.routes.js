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

router.use('/', dlc_controller.listar); //Main Index

module.exports = router;
