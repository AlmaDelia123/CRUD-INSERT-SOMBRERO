var conexion=require('../config/conexion');
var sombrero= require("../model/sombrero");
var borrar= require("fs");


module.exports={


    index:function(req, res) {

        sombrero.obtener(conexion,function (err,datos){
            console.log(datos);
            res.render('sombreros/index', { title: 'Aplicacion', sombreros:datos });

        });

    },
    crear:function (req, res){
        res.render('sombreros/crear');
    },
    guardar:function (req,res) {
        console.log(req.body);
        console.log(req.file.filename);

        sombrero.insertar(conexion,req.body,req.file,function (err) {
                     res.redirect('/vendedor/sombreros');
        });

    },
    eliminar:function (req,res) {
        console.log("Recepcion de datos");
        console.log(req.params.id);

        sombrero.retornarDatosID(conexion,req.params.id,function (err,registros) {
            var nombreImage="public/images/"+(registros[0].imagen); 
            if(borrar.existsSync(nombreImage)){
                borrar.unlinkSync(nombreImage);
            }
            sombrero.borrar(conexion,req.params.id,function (err){
                res.redirect('/vendedor/sombreros');
            });

        });

    },
    editar:function(req,res){
        sombrero.retornarDatosID(conexion,req.params.id,function (err,registros) {
            console.log(registros[0]);
            res.render('sombreros/editar', {sombrero:registros[0]});
        });

    },
    actualizar:function name(req,res) {
        console.log(req.body.nombre);
        //console.log(req.file.filename);
        console.log(req.body.tipo);
        console.log(req.body.material);
        console.log(req.body.precio);

        
        if(req.file){
            if(req.file.filename){

                sombrero.retornarDatosID(conexion,req.body.id,function (err,registros) {
                    var nombreImage="public/images/"+(registros[0].imagen); 
                    if(borrar.existsSync(nombreImage)){
                        borrar.unlinkSync(nombreImage);
                    }

                 sombrero.actualizarArchivo(conexion,req.body,req.file,function(err){});
        
                });
            }

        }
        if(req.body.nombre){
            sombrero.actualizar(conexion,req.body,function (err) {
            });

        }

        res.redirect('/vendedor/sombreros');
    }
}