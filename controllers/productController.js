// var conexion=require('../config/conexion');
const { createConnection, defaultConfig, configBDVendedor, configBDUsuario } = require('../config/conexion');
var conexion = createConnection(configBDUsuario);

var sombrero = require("../model/sombrero");
var borrar = require("fs");


const productController = {}
//carga  la vista principal del proyecto

productController.index = (req, res) => {

    conexion.query("SELECT * FROM sombreros", (err, datos) => {
        if (err) {
            console.log("Error en la consulta")
        } else {
            res.render('productos/productos', { title: 'Aplicacion', sombreros: datos });
        }


    });
    // sombrero.obtener(conexion,function (err,datos){
    //     console.log(datos);


    // });


}



// index:function(req, res) {

//     sombrero.obtener(conexion,function (err,datos){
//         console.log(datos);
//         res.render('sombreros/index', { title: 'Aplicacion', sombreros:datos });

//     });

// }

module.exports = productController;