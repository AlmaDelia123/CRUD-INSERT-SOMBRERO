// var conexion=require('../config/conexion');
const { createConnection, defaultConfig, configBDVendedor, configBDUsuario } = require('../config/conexion');

var conexion = createConnection(configBDUsuario);

var sombrero = require("../model/sombrero");
var borrar = require("fs");


const productController = {}
//carga  la vista principal del proyecto

productController.index = (req, res) => {
    conexion.query('SELECT * FROM sombreros', (err, datos) => {
        if (err) {
            console.error('el error es;' + err);
        } else {
            const cart = req.session && req.session.cart ? req.session.cart : [];
            res.render('productos/productos', { title: 'Aplicacion', sombreros: datos, cart: cart });
            // res.render('sombreros/index', {sombreros:datos})
        }
    })
}


/*este metodo  hace las consultas y manda los datos a la vista para que sean
graficados */
productController.estadisticas = (req, res) => {

    conexion.query("SELECT p.id_sombreros, s.nombre AS nombre_sombrero, COUNT(*) AS total_registros FROM pedido p JOIN sombreros s ON p.id_sombreros = s.id GROUP BY p.id_sombreros, s.nombre", (err, datos) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'Error al obtener estadísticas' });
        } else {
            
            conexion.query("SELECT p.id_sombreros, s.nombre AS nombre_sombrero, SUM(s.precio * p.cantidad) AS total_ventas FROM pedido p JOIN sombreros s ON p.id_sombreros = s.id GROUP BY p.id_sombreros, s.nombre", (err2, datos2) => {
                if (err2) {
                    console.log(err);
                    res.status(500).json({ error: 'Error al obtener estadísticas' });
                } else {
                    res.render("vendedor/estadisticas", { data1: datos, data2:datos2 })
                }


            })
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

//carga el apartado de configuracion del vendedor
productController.config = (req, res) => {
    res.render('../views/usuario/conf_user');
}


//carga  la vista principal del proyecto
productController.home = (req, res) => {
    res.render('home')
}

module.exports = productController;