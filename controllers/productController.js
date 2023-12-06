const ExcelJS = require('exceljs');
const path = require('path');

const { createConnection, configBDUsuario } = require('../config/conexion');
const borrar = require('fs');

const productController = {};

productController.index = (req, res) => {
    createConnection(configBDUsuario).query('SELECT * FROM sombreros', (err, datos) => {
        if (err) {
            console.error('El error es: ' + err);
        } else {
            const cart = req.session && req.session.cart ? req.session.cart : [];
            res.render('productos/productos', { title: 'Aplicacion', sombreros: datos, cart: cart });
        }
    });
};

productController.estadisticas = (req, res) => {
    createConnection(configBDUsuario).query(
        'SELECT p.id_sombreros, s.nombre AS nombre_sombrero, COUNT(*) AS total_registros FROM pedido p JOIN sombreros s ON p.id_sombreros = s.id GROUP BY p.id_sombreros, s.nombre',
        (err, datos) => {
            if (err) {
                console.log(err);
                res.status(500).json({ error: 'Error al obtener estadísticas' });
            } else {
                createConnection(configBDUsuario).query(
                    'SELECT p.id_sombreros, s.nombre AS nombre_sombrero, SUM(s.precio * p.cantidad) AS total_ventas FROM pedido p JOIN sombreros s ON p.id_sombreros = s.id GROUP BY p.id_sombreros, s.nombre',
                    (err2, datos2) => {
                        if (err2) {
                            console.log(err);
                            res.status(500).json({ error: 'Error al obtener estadísticas' });
                        } else {
                            res.render('vendedor/estadisticas', { data1: datos, data2: datos2 });
                        }
                    }
                );
            }
        }
    );
};

productController.generarInforme = (req, res) => {
     // Obtener los datos de estadísticas desde el cuerpo de la solicitud
     //const data1 = JSON.parse(req.body.data1);
     //const data2 = JSON.parse(req.body.data2);
    // Realizar las consultas necesarias para obtener los datos
    createConnection(configBDUsuario).query(
        'SELECT p.id_sombreros, s.nombre AS nombre_sombrero, COUNT(*) AS total_registros FROM pedido p JOIN sombreros s ON p.id_sombreros = s.id GROUP BY p.id_sombreros, s.nombre',
        (err, datos1) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'exito' });
                return;
            }

            createConnection(configBDUsuario).query(
                'SELECT p.id_sombreros, s.nombre AS nombre_sombrero, SUM(s.precio * p.cantidad) AS total_ventas FROM pedido p JOIN sombreros s ON p.id_sombreros = s.id GROUP BY p.id_sombreros, s.nombre',
                (err2, datos2) => {
                    if (err2) {
                        console.error(err2);
                        res.status(500).json({ error: 'Error al obtener datos para el informe' });
                        return;
                    }

                    // Crear un nuevo libro de Excel
                    const workbook = new ExcelJS.Workbook();
                    const worksheet = workbook.addWorksheet('Informe');

                    // Agregar datos de la primera gráfica
                    worksheet.addRow(['Cantidad de sombreros en pedidos']);
                    worksheet.addRow(['Nombre Sombrero', 'Total Registros']);
                    datos1.forEach((item) => {
                        worksheet.addRow([item.nombre_sombrero, item.total_registros]);
                    });
                    worksheet.addRow([]); // Agregar una fila en blanco para separar las secciones

                    // Agregar datos de la segunda gráfica
                    worksheet.addRow(['Total de ganancias por sombrero']);
                    worksheet.addRow(['Nombre Sombrero', 'Total Ventas']);
                    datos2.forEach((item) => {
                        worksheet.addRow([item.nombre_sombrero, item.total_ventas]);
                    });

                    // Guardar el archivo Excel
                    const fileName = `informe_${new Date().getTime()}.xlsx`;
                    const filePath = path.join(__dirname, '..', 'public', 'reports', fileName);

                    workbook.xlsx.writeFile(filePath)
                        .then(() => {
                            // Enviar el archivo al cliente para su descarga
                            res.download(filePath, (err) => {
                                // Eliminar el archivo después de descargarlo
                                borrar.unlink(filePath, (err) => {
                                    if (err) {
                                        console.error(err);
                                    }
                                });
                            });
                        })
                        .catch((error) => {
                            console.error(error);
                            res.status(500).json({ error: 'Error al generar el informe en Excel' });
                        });
                }
            );
        }
    );
};

productController.config = (req, res) => {
    res.render('../views/usuario/conf_user');
};

productController.home = (req, res) => {
    res.render('home');
};

module.exports = productController;
