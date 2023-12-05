const mysql = require("mysql");
// <<<<<<< HEAD
var con= mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'itsh2023',
        database: 'sombreros_calentanos'
});
// =======
// const conexionConfig = {}
// >>>>>>> 6eabc2b662fabf188228bc93beac9f77530387c2

// function usuarioConexion() {
//     con = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'chanocua24',
//         database: 'sombreros_calentanos'


//     });

//     console.log("usuario conectado");
// }

// function vendedorConexion() {
//     con = mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'chanocua24',
//         database: 'sombreros_calentanos'
//     });

//     console.log("vendedor conectado");
// }

// var con = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'chanocua24',
//     database: 'sombreros_calentanos'
// });


// con.connect(
//     (err) => {
//         if (!err) {
//             console.log('Conexion establecida http://localhost:3002');
//         } else {
//             console.log('Error de conexion');
//         }
//     });

// module.exports = con;

// con.usuarioConexion = ()=>{

//     mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'chanocua24',
//         database: 'sombreros_calentanos'
//     });

// }



const defaultConfig = {
    host: 'localhost',
    user: 'root',
    password: 'chanocua24',
    database: 'sombreros_calentanos'
};

const configBDVendedor = {
    host: 'localhost',
    user: 'vendedor',
    password: 'vendedor2023',
    database: 'sombreros_calentanos'
};

const configBDUsuario = {
    host: 'localhost',
    user: 'usuario',
    password: 'usuarioSombreros2023',
    database: 'sombreros_calentanos'
}

function createConnection(config) {
    console.log(config);
    return mysql.createConnection(config);
}


module.exports = { createConnection, defaultConfig, configBDVendedor, configBDUsuario };