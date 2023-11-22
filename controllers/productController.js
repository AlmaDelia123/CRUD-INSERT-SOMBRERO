var conexion=require('../config/conexion');
var sombrero= require("../model/sombrero");
var borrar= require("fs");


const productController = {}

//carga  la vista principal del proyecto
productController.index = (req, res) =>{

    sombrero.obtener(conexion,function (err,datos){
        console.log(datos);
        res.render('productos/productos', { title: 'Aplicacion', sombreros:datos });

    });
    
}


// index:function(req, res) {

//     sombrero.obtener(conexion,function (err,datos){
//         console.log(datos);
//         res.render('sombreros/index', { title: 'Aplicacion', sombreros:datos });

//     });

// }

module.exports = productController;