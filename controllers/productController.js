var conexion=require('../config/conexion');
var sombrero= require("../model/sombrero");
var borrar= require("fs");


const productController = {}

//carga  la vista principal del proyecto
productController.index = (req, res) => {
    sombrero.obtener(conexion, function (err, datos) {
        console.log(datos);
        // Verificar si req.session está definido y tiene una propiedad cart
        const cart = req.session && req.session.cart ? req.session.cart : [];
        res.render('productos/productos', { title: 'Aplicacion', sombreros: datos, cart: cart });
    });
}



// index:function(req, res) {

//     sombrero.obtener(conexion,function (err,datos){
//         console.log(datos);
//         res.render('sombreros/index', { title: 'Aplicacion', sombreros:datos });

//     });

// }

module.exports = productController;