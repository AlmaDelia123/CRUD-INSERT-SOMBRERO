var express = require('express');
var router = express.Router();
const sombrerosController = require("../controllers/sombrerosController");
const usersController = require("../controllers/usersController");
const homeController = require('../controllers/homeController');
const vendedorController = require('../controllers/vendedorController')

var multer = require('multer');
const { route } = require('../app');
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
//vista principal del sitio
router.get('/', homeController.index)


// login y registro de usuarios
router.get('/login', usersController.loginGET)
router.post('/login', usersController.loginPOST)

router.get('/registrarUsuario', usersController.registrarUsuarioGET)
router.post('/registrarUsuario', usersController.registrarUsuarioPOST)

// router.get('/',sombrerosController.index);

// gets y post para el vendedor
router.get('/vendedor/home', vendedorController.home)

router.get('/vendedor/sombreros',sombrerosController.index);

router.get('/vendedor/sombreros/crear',sombrerosController.crear);
router.post("/vendedor/sombreros/crear",cargar.single("archivo"),sombrerosController.guardar);

router.post('/vendedor/sombreros/eliminar/:id',sombrerosController.eliminar);

router.get('/vendedor/sombreros/editar/:id',sombrerosController.editar);
router.post("/vendedor/sombreros/actualizar",cargar.single("archivo"),sombrerosController.actualizar);

module.exports = router;
