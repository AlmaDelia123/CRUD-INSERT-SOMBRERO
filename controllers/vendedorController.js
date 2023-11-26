const { render } = require("ejs");
var conexion = require('../config/conexion');
const { get } = require("../app");

vendedorController = {}

//carga el dashboard del vendedor
vendedorController.home = (req, res) =>{
    res.render('vendedor/home');
}

module.exports = vendedorController;