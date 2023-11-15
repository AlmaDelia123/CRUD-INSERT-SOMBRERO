var express = require('express');
var router = express.Router();
const sombrerosController = require("../controllers/sombrerosController");


var multer = require('multer');
var fecha= Date.now();

var rutaAlmacen= multer.diskStorage(
    {

    destination:function(request, file, callback) {
        callback(null,'./public/images');
    },
    filename:function (request, file, callback) {
        console.log(file);
        callback(null,fecha+"_"+file.originalname);
    }
}
);
var cargar= multer({ storage:rutaAlmacen});


/* GET home page. */
router.get('/',sombrerosController.index);
router.get('/crear',sombrerosController.crear);
router.post("/",cargar.single("archivo"),sombrerosController.guardar);

router.post('/eliminar/:id',sombrerosController.eliminar);

router.get('/editar/:id',sombrerosController.editar);

router.post("/actualizar",cargar.single("archivo"),sombrerosController.actualizar);

module.exports = router;
