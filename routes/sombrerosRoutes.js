var express = require('express');
var router = express.Router();
const sombrerosController = require("../controllers/sombrerosController");
const usersController = require("../controllers/usersController");
// const homeController = require('../controllers/homeController');
// const vendedorController = require('../controllers/vendedorController')

var multer = require('multer');
const { route } = require('../app');
const productController = require('../controllers/productController');
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
router.get('/', productController.home)
//router.get('/',productController.index)//se agrgo para los productos

// login y registro de usuarios
router.get('/login', usersController.loginGET)
router.post('/login', usersController.loginPOST)

router.get('/registrarUsuario', usersController.registrarUsuarioGET)
router.post('/registrarUsuario', usersController.registrarUsuarioPOST)
//router.get('/login/productoss',usersController.productosGET)
// router.get('/',sombrerosController.index);

// gets y post para el vendedor
router.get('/vendedor/home', sombrerosController.home)

router.get('/vendedor/sombreros',sombrerosController.index);
router.get('/vendedor/sombreros/crear',sombrerosController.crear);
router.post("/vendedor/sombreros/crear",cargar.single("archivo"),sombrerosController.guardar);
router.post('/vendedor/sombreros/eliminar/:id',sombrerosController.eliminar);
router.get('/vendedor/sombreros/editar/:id',sombrerosController.editar);
router.post("/vendedor/sombreros/actualizar",cargar.single("archivo"),sombrerosController.actualizar);


//usuarios
router.get('/usuario/productos',productController.index);
//vista pagina de configuracion de usuario
router.get('/usuario/config', productController.config);
router.get('/vendedor/estadisticas/bar', productController.estadisticas);
// router.get('/usuario/home', productController.home);




router.post('/add_cart', (request, response) => {
    const id = request.body.id;
    const nombre = request.body.nombre;
    const precio = parseFloat(request.body.precio);
    let count = 0;

    for (let i = 0; i < request.session.cart.length; i++) {
        if (request.session.cart[i].id === id) {
            request.session.cart[i].cantidad += 1;
            count++;
        }
    }

    if (count === 0) {
        const cart_data = {
            id: id,
            nombre: nombre,
            precio: precio,
            cantidad: 1
        };

        request.session.cart.push(cart_data);
    }

    response.redirect("/usuario/productos");
});

router.get('/remove_item', (request, response) => {
    const id = request.query.id;

    // Usar Array.findIndex para encontrar el índice del elemento a eliminar
    const indexToRemove = request.session.cart.findIndex(item => item.id === id);

    if (indexToRemove !== -1) {
        // Si se encontró el elemento, eliminarlo
        request.session.cart.splice(indexToRemove, 1);
    }

    response.redirect("/usuario/productos");
});

module.exports = router;
