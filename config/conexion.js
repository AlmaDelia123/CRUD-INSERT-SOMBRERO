var mysql = require("mysql");

var con= mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root2023',
        database: 'sombreros_calentanos'



}
);
con.connect(
    (err)=>{
        if(!err){
            console.log('Conexion establecida http://localhost:3002');
        }else{
            console.log('Error de conexion');

        }        
    }       

);
module.exports=con;