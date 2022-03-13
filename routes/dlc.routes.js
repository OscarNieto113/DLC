const express = require('express');
const router = express.Router();

const dlc_controller = require('../controllers/dlc_controller');

router.use('/', dlc_controller.listar); //Main Index

router.use('/vacaciones', dlc_controller.vacaciones);

module.exports = router;
