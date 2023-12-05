
/*este controller se encarga de realizar todas las operaciones
con la vista de home del usuario */

// var conexion=require('../config/conexion');
const homeController = {}

//carga  la vista principal del proyecto
homeController.index = (req, res) =>{
    res.render('home')
}

module.exports = homeController;