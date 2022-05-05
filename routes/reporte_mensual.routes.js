const express = require('express');
const router = express.Router();
const multer = require('multer');
const isAuth = require('../util/is-auth.js');

const reporte_mensual_controller = require('../controllers/reporte_mensual_controller');

const multerMid = multer.diskStorage({
  filename: (request, file, callback) => {
        callback(null, new Date().getTime()+ '-' + file.originalname);
    }
});

router.post('/post',isAuth, multer({ storage: multer.memoryStorage() }).single('imagen_reporte'), reporte_mensual_controller.post_reportes_mensuales);
router.get('/filtrar/:fecha', isAuth, reporte_mensual_controller.filtrar_fecha);
router.post('/delete/:id_reportes_mensuales', isAuth, reporte_mensual_controller.post_delete_reportes_mensuales);
router.get('/generar_reporte/:fechaRadio/:fecha/:tabla/:estatus', isAuth, reporte_mensual_controller.get_generar_reporte);

router.use('/', isAuth, reporte_mensual_controller.get_reportes_mensuales);


module.exports = router;
