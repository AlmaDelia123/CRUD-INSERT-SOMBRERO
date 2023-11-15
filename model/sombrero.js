module.exports={
    obtener:function (conexion,funcion){
        conexion.query("SELECT * FROM sombreros", funcion);
    },
    insertar:function (conexion,datos,archivos,funcion){

        conexion.query("INSERT INTO sombreros (nombre, imagen, tipo, material, precio) VALUES (?,?,?,?,?) ",[datos.nombre, archivos.filename, datos.tipo, datos.material, datos.precio], funcion);
    },
    retornarDatosID:function (conexion,id,funcion) {
        conexion.query("SELECT * FROM sombreros WHERE id=? ",[id],funcion);
    },
    borrar:function (conexion,id,funcion){
            conexion.query("DELETE FROM sombreros WHERE id=? ",[id],funcion);
    },
    actualizar:function (conexion,datos,funcion){

        conexion.query("UPDATE sombreros SET nombre=?, tipo=?, material=?, precio=? WHERE id=?", [datos.nombre, datos.tipo, datos.material, datos.precio, datos.id], funcion);
    },
    actualizarArchivo:function (conexion,datos,archivo,funcion){

        conexion.query("UPDATE sombreros SET imagen=? WHERE id=?", [archivo.filename,datos.id], funcion);
    },
}