/*este controlador se encarga de realizar
todas las operaciones para el login y el registro */
const { render } = require("ejs");
// var conexion = require('../config/conexion');
const { get } = require("../app");
// const con = require("../config/conexion");

const { createConnection, defaultConfig, configBDVendedor } = require('../config/conexion');

//var global para almacenar las conexiones
var conexion = "";

const usersController = {}

//cuando la peticion sea get, manda la vista
usersController.loginGET = (req, res) => {
    res.render('login/login')
}

//cuando la peticion sea post, manda los datos
usersController.loginPOST = (req, res) => {

    const correo = req.body.correo;
    const password = req.body.password;

    //inicia la conexion inicial con la base
    conexion = createConnection(defaultConfig);

    // req.getConnection((err, conexion) => {
    conexion.query("SELECT * FROM users_sesion WHERE correo = ? AND password = ?", [correo, password], (err, datosConsultados) => {
        console.log(datosConsultados.length)
        if (err) {
            console.log(err);
            res.status(500).send('No se pudo iniciar sesión ' + err);

            /*si la consulta si recogio dato entonces ent4ra en la condicion*/
        } else if (datosConsultados.length > 0) {
            const usuario = datosConsultados[0];

            /*le damos el valor a una constante el valor del rango */
            const rango = usuario.rango;
            console.log(rango)

            //se cierra la conexion de la base inicial
            conexion.end();
            /*con un switch mandamos la vista */
            switch (rango) {
                case 'admin':
                    break;

                case 'vendedor':
                    conexion = createConnection(configBDVendedor);
                    
                    res.redirect('vendedor/home');
                    console.log(usuario.idusers_dates)

                    break;

                case 'usuario':



                    res.redirect('/');
                    console.log(usuario.idusers_dates);

                    break;

                default:

                    break;
            }


        } else {

            res.redirect('/')
        }
    });
}

//manda la vista del registro de usuario
usersController.registrarUsuarioGET = (req, res) => {



    res.render('registrarUsuario/registrarUsuario')
}

//manda los datos del registro de usuari
usersController.registrarUsuarioPOST = (req, res) => {
    var datos_per = [
        req.body.name,
        req.body.ap_paterno,
        req.body.ap_materno,
        req.body.edad,
        req.body.tel,
    ];
    // req.getConnection((err, conexion) => {

    var userId;
    conexion.query('INSERT INTO users_data (nombre, ap_paterno, ap_materno, edad, tel) VALUES (?, ?, ?, ?, ?)', datos_per, (error, results) => {


        if (error) {
            console.error('el error es;' + error)
        } else {

            //obtiene el ultimo valor de la primer consulta
            userId = results.insertId;
            console.log(userId)

            if (userId != "" || userId != null) {
                var datos_session = [
                    userId,
                    req.body.correo,
                    req.body.password,
                    req.body.rol
                ];
                conexion.query('INSERT INTO users_sesion (idusers_dates, correo, password, rango) VALUES (?, ?, ?, ?)', datos_session, (error, results) => {
                    if (error) {
                        console.error('el error es;' + error)
                    } else {
                        res.redirect('/login');
                    }
                })
            }
        }
    })
    // });




}


module.exports = usersController;