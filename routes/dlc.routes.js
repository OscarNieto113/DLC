const express = require('express');
const router = express.Router();

const dlc_controller = require('../controllers/dlc_controller');

//router.get('/cerveza', natgasController.cerveza);
//router.get('/nuevo', natgasController.get_nuevo);
//router.post('/nuevo', natgasController.post_nuevo);
router.use('/', dlc_controller.listar); //Main Index

router.use('/vacaciones', dlc_controller.vacaciones);

module.exports = router;
