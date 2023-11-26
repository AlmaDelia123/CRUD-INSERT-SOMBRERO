/*este controlador se encarga de hacer todas las operaciones
oon la parte del crud de los sombreros */

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

    //Funcion que dirige a la vista crear sombrero con su formulario
    crear:function (req, res){
        res.render('sombreros/crear');
    },


    // crud guardar sombrero 
    guardar: function (req, res) {
        console.log(req.body);
        console.log(req.file.filename);
    
        sombrero.insertar(conexion, req.body, req.file, function (err) {
            if (err) {
                // Manejo de errores si es necesario
                console.error(err);
                return res.status(500).send('Error al insertar el sombrero');
            }
    
            // Redirección con indicador para mostrar el Sweet Alert
            res.redirect('/vendedor/sombreros?mostrarAlerta=true');
        });
    },
    
    // crud eliminar el sombrero
    eliminar: function (req, res) {
        console.log("Recepcion de datos");
        console.log(req.params.id);
    
        sombrero.retornarDatosID(conexion, req.params.id, function (err, registros) {
            var nombreImagen = "public/images/" + registros[0].imagen;
    
            sombrero.borrar(conexion, req.params.id, function (err) {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Error al eliminar el sombrero');
                }
    
                // Eliminar la imagen después de eliminar el sombrero
                if (borrar.existsSync(nombreImagen)) {
                    borrar.unlinkSync(nombreImagen);
                }
    
                // Redirigir a la página de sombreros después de eliminar
                res.status(200).send('Sombrero eliminado exitosamente');
            });
        });
    },
    
    
    //Funcion que dirige a la vista editar sombrero con su formulario
    editar:function(req,res){
        sombrero.retornarDatosID(conexion,req.params.id,function (err,registros) {
            console.log(registros[0]);
            res.render('sombreros/editar', {sombrero:registros[0]});
        });

    },

    //crud actualizar el sombrero
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

        
            // Redirección con indicador para mostrar el Sweet Alert de la actualizacion
            res.redirect('/vendedor/sombreros?mostrarAlerta2=true');
            //res.redirect('/vendedor/sombreros');
    }
}