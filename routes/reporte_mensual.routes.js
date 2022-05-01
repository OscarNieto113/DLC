const express = require('express');
const router = express.Router();
const multer = require('multer');
const isAuth = require('../util/is-auth.js');



const util = require('util')
const gc = require('./config/')
const bucket = gc.bucket('dlc-itesm.appspot.com') // should be your bucket name

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

export const uploadImage = (file) => new Promise((resolve, reject) => {
  const { originalname, buffer } = file

  const blob = bucket.file(originalname.replace(/ /g, "_"))
  const blobStream = blob.createWriteStream({
    resumable: false
  })
  blobStream.on('finish', () => {
    const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    )
    resolve(publicUrl)
  })
  .on('error', () => {
    reject(`Unable to upload image, something went wrong`)
  })
  .end(buffer)
})




const reporte_mensual_controller = require('../controllers/reporte_mensual_controller');

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

router.post('/post',isAuth, multer({ storage: multer.memoryStorage() }).single('imagen_reporte'),reporte_mensual_controller.post_reportes_mensuales);
router.get('/filtrar/:fecha', isAuth, reporte_mensual_controller.filtrar_fecha);
router.post('/delete/:id_reportes_mensuales', isAuth, reporte_mensual_controller.post_delete_reportes_mensuales);
router.get('/generar_reporte/:fechaRadio/:fecha/:tabla/:estatus', isAuth, reporte_mensual_controller.get_generar_reporte);

router.use('/', isAuth, reporte_mensual_controller.get_reportes_mensuales);






module.exports = router;
