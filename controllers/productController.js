// var conexion=require('../config/conexion');
const { createConnection, defaultConfig, configBDVendedor, configBDUsuario } = require('../config/conexion');

var conexion = createConnection(configBDUsuario);

var sombrero = require("../model/sombrero");
var borrar = require("fs");


const productController = {}
//carga  la vista principal del proyecto

productController.index = (req, res) =>{
    conexion.query('SELECT * FROM sombreros', (err, datos) =>{
        if (err) {
            console.error('el error es;' + err);
        } else {
            const cart = req.session && req.session.cart ? req.session.cart : [];
            res.render('productos/productos', { title: 'Aplicacion', sombreros: datos, cart: cart });
            // res.render('sombreros/index', {sombreros:datos})
        }
    })
    }

// productController.index = (req, res) => {
//     sombrero.obtener(conexion, function (err, datos) {
//         console.log(datos);
//         // Verificar si req.session está definido y tiene una propiedad cart
//         const cart = req.session && req.session.cart ? req.session.cart : [];
//         res.render('productos/productos', { title: 'Aplicacion', sombreros: datos, cart: cart });
//     });
// }

// var conexion=require('../config/conexion');

//carga  la vista principal del proyecto
productController.home = (req, res) =>{
    res.render('home')
}

module.exports = productController;