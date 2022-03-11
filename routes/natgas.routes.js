const express = require('express');
const router = express.Router();

const natgasController = require('../controllers/natgas_controller');

//router.get('/cerveza', natgasController.cerveza);
//router.get('/nuevo', natgasController.get_nuevo);
//router.post('/nuevo', natgasController.post_nuevo);
router.use('/', natgasController.listar); //Main Index

module.exports = router;
