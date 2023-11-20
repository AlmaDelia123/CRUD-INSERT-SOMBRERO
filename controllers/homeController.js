var conexion=require('../config/conexion');

const homeController = {}

//carga  la vista principal del proyecto
homeController.index = (req, res) =>{


    res.render('home')
}

module.exports = homeController;