const mysql = require("mysql");

const defaultConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root2023',
    database: 'sombreros_calentanos'
};

const configBDVendedor = {
    host: 'localhost',
    user: 'vendedor',
    password: 'vende123',
    database: 'sombreros_calentanos'
};

const configBDUsuario = {
    host: 'localhost',
    user: 'usuario',
    password: 'som12',
    database: 'sombreros_calentanos'
}

function createConnection(config) {
    console.log(config);
    return mysql.createConnection(config);
}


module.exports = { createConnection, defaultConfig, configBDVendedor, configBDUsuario };