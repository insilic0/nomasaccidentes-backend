// const Usuario = require('../models/Usuario');
// const bcryptjs = require('bcryptjs');
// const {validationResult} = require('express-validator');
// const jwt = require('jsonwebtoken');
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

exports.agregarUsuario = async(req,res) =>{

    try {
        connection = await oracledb.getConnection({
            user: process.env.USER,
            password: process.env.PASSWORD,
            connectString: "localhost:1521/xe"
        });

        let {runRepLegal, pNombre, sNombre,
            aPaterno, aMaterno, fechaNacimiento,
            correoElectronico, telefonoCelular, direccion,
            comuna, numeroDomicilio, tipoDomicilio, userName,
            password,rutEmpresa, razonSocial, giroEmpresa, casaMatriz,
            numeroCasaMatriz, correoEmpresa, telefonoEmpresa } = req.body;
            const dv_empresa = rutEmpresa.charAt(rutEmpresa.length-1);
            const dv_rep= runRepLegal.charAt(runRepLegal.length-1);

            comuna = parseInt(comuna);


        let params = {
            id_comuna: {val: comuna, dir: oracledb.BIND_IN, type: oracledb.NUMBER},
            nombre_calle: {val: direccion , dir: oracledb.BIND_IN, type: oracledb.STRING},
            numero_domicilio: {val: numeroDomicilio, dir: oracledb.BIND_IN, type: oracledb.STRING},
            tipo_domicilio: {val: tipoDomicilio, dir: oracledb.BIND_IN, type: oracledb.STRING},
            rut_empresa: {val: rutEmpresa, dir: oracledb.BIND_IN, type: oracledb.STRING},
            dv_empresa: {val: dv_empresa, dir: oracledb.BIND_IN, type: oracledb.STRING},
            nombre_empresa: {val: razonSocial, dir: oracledb.BIND_IN, type: oracledb.STRING},
            giro_empresa: {val: giroEmpresa, dir: oracledb.BIND_IN, type: oracledb.STRING},
            casa_matriz: {val: casaMatriz, dir: oracledb.BIND_IN, type: oracledb.STRING},
            correo_empresa: {val: correoEmpresa, dir: oracledb.BIND_IN, type: oracledb.STRING},
            numero_casa_matriz: {val: numeroCasaMatriz, dir: oracledb.BIND_IN, type: oracledb.STRING},
            telefono_empresa: {val: telefonoEmpresa, dir: oracledb.BIND_IN, type: oracledb.STRING},
            run_rep_legal: {val: runRepLegal, dir: oracledb.BIND_IN, type: oracledb.STRING},
            dv_rep_legal: {val: dv_rep, dir: oracledb.BIND_IN, type: oracledb.STRING},
            primer_nombre: {val: pNombre, dir: oracledb.BIND_IN, type: oracledb.STRING},
            segundo_nombre: {val: sNombre, dir: oracledb.BIND_IN, type: oracledb.STRING},
            apellido_paterno: {val: aPaterno, dir: oracledb.BIND_IN, type: oracledb.STRING},
            apellido_materno: {val: aMaterno, dir: oracledb.BIND_IN, type: oracledb.STRING},
            fecha_nacimiento: {val: new Date(), dir: oracledb.BIND_IN, type: oracledb.DATE},
            correo_electronico: {val: correoElectronico, dir: oracledb.BIND_IN, type: oracledb.STRING},
            telefono_celular: {val: telefonoCelular, dir: oracledb.BIND_IN, type: oracledb.STRING},
            user_name: {val: userName, dir: oracledb.BIND_IN, type: oracledb.STRING},
            password: {val: password, dir: oracledb.BIND_IN, type: oracledb.STRING},
            
        }

        let query = `CALL SP_AGREGAR_CLIENTE(:id_comuna,:nombre_calle,:numero_domicilio,:tipo_domicilio,:rut_empresa,:dv_empresa,:nombre_empresa,:giro_empresa,:casa_matriz,:correo_empresa,:numero_casa_matriz,:telefono_empresa,:run_rep_legal,:dv_rep_legal,:primer_nombre,:segundo_nombre,:apellido_paterno,:apellido_materno,:fecha_nacimiento,:correo_electronico,:telefono_celular,:user_name,:password)`;
        var result = await connection.execute(query, params);

        res.status(200).json({
            ok: true
        })


    } catch (error) {
        console.log(error.message)
        res.send(error.message);
    }

}

// exports.verUsuarios = async(req, res) =>{

   
//     try {
//         connection = await oracledb.getConnection({
//             user: "PORTAFOLIO",
//             password: password,
//             connectString: "localhost:1521/xe"
//         });        
        
//         let result = await connection.execute(`SELECT * FROM REGION`);

//     } catch (error) {
//         res.send(error.message);
//     }
//     finally{
//         if(result){
//             try {
//                 await connection.close();
//                 console.log('closed');
//             } catch (error) {
//                 console.log(error.message);
//             }
//         }

        
//     }
//     if(result.rows.lengt h === 0){
//         return res.send('Query send no rows');
//     }
//     else{
//         return res.send(result.rows);
//     }
// }

// exports.crearCliente = async(req, res) =>{

//     //Revisar si hay errores
//     const errores = validationResult(req);
//     if(!errores.isEmpty()){
//         res.status(400).json({
//             ok: false,
//             errores: errores.array()
//         });
//     }

//     //Extraer los calores
//     const{ email, password } = req.body;

//     try {

//         //Revisar que el usuario sea unico

//         let usuario = await Usuario.findOne({ email });

//         if(usuario){
//             return res.status(400).json({
//                 ok:false,
//                 msg: "El usuario con correo " + email +" ya existe"
//             })
//         }

        
//         //crea el nuevo usuario

//         usuario = new Usuario(req.body);

//         //Hash de password
//         const salt = await bcryptjs.genSalt(10);
//         usuario.password = await bcryptjs.hash(password, salt);


//         //Guardar
//         await usuario.save();

//         //Crear el jwt
//         const payload = {
//             usuario:{
//                 id: usuario.id
//             }
//         };  

//         //Firmar JWT
//         jwt.sign(payload, process.env.SECRETA, {
//             expiresIn: 3600
//         }, (error, token)=>{

//             if(error) throw error;
//             res.json({token});
//         });

//         // res.status(200).json({
//         //     ok: true,
//         //     msg: "Usuario creado con éxito",
//         //     usuario
//         // })
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({
//             ok: false,
//             msg: "Hubo un error al guardar usuario"
//         });
//     }

// }