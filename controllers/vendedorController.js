const { render } = require("ejs");
// var conexion = require('../config/conexion');
const { get } = require("../app");

const { createConnection, defaultConfig, configBDVendedor, configBDUsuario } = require('../config/conexion');
var conexion = createConnection(configBDVendedor);

vendedorController = {}

//carga el dashboard del vendedor
vendedorController.home = (req, res) =>{
    res.render('vendedor/home');
}

module.exports = vendedorController;