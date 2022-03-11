const express = require('express');
const router = express.Router();

const dlc_controller = require('../controllers/dlc_controller');

router.use('/', dlc_controller.listar); //Main Index

router.get('/vacaciones', dlc_controller.vacaciones);

module.exports = router;
