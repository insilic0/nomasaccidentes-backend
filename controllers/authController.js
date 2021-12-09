const oracledb = require('oracledb');
const bcryptjs = require('bcryptjs');
const {validationResult, param} = require('express-validator');
const jwt = require('jsonwebtoken');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;


exports.autenticarUsuario = async (req, res) =>{

    // //Revisar si hay errores
    // const errores = validationResult(req);
    // if(!errores.isEmpty()){
    //     res.status(400).json({
    //         ok: false,
    //         errores: errores.array()
    //     });
    // }

    //Extraer usuario 
    const{email , password} = req.body;

    try {
        
        connection = await oracledb.getConnection({
            user: process.env.USER,
            password: process.env.PASSWORD,
            connectString:"localhost:1521/xe"
        });

        // let query = `SELECT p.correo_electronico_prof, up.password FROM USUARIO_PROF up INNER JOIN PROFESIONAL p ON up.profesional_id_profesional = p.id_profesional WHERE p.CORREO_ELECTRONICO_PROF= :CORREO_ELECTRONICO_PROF AND up.password= :password`;
        // var usuario = await connection.execute(query, {CORREO_ELECTRONICO_PROF: {val: `${email}`, dir: oracledb.BIND_IN, type: oracledb.STRING}, password:{val: `${password}`, dir: oracledb.BIND_IN, type: oracledb.STRING}});
        
        let params = {
            correo: {val: `${email}`, dir: oracledb.BIND_IN, type: oracledb.STRING},
            password:{val: `${password}`, dir: oracledb.BIND_IN, type: oracledb.STRING},
            correo_out:{dir: oracledb.BIND_OUT, type: oracledb.STRING},
            id_out: {dir: oracledb.BIND_OUT, type: oracledb.NUMBER}

        }
        let query = `CALL SP_LOGIN(:correo, :password, :correo_out, :id_out)`;

        var result = await connection.execute(query, params);
        
         if( result.outBinds.correo_out === null){
             return res.status(400).json({
                 msg:'Correo o contraseña incorrectos'
             })
         }
    
        const payload={
            usuario:{
                usuario: result.outBinds
            }
        }

        jwt.sign(payload, process.env.SECRETA,{
            expiresIn:3600
        }, (err, token)=>{
            if (err) throw err;
            //Mensaje de confirmación
            res.json({
                token: token
            });
        })

    } catch (error) {
        res.send(error.message);
    }
    finally{
        if(result){
            try {
                await connection.close();
                console.log('closed');
            } catch (error) {  
                console.log(error.message);
            }
        }
    }

    
}



//Obtener el usuario autenticado
exports.usuarioAutenticado = async(req, res)=>{
    
    try{
        connection = await oracledb.getConnection({
            user: process.env.USER,
            password: process.env.PASSWORD,
            connectString:"localhost:1521/xe"
        });
        let params = {
            id: {val: req.usuario.id_out, dir: oracledb.BIND_INOUT, type: oracledb.NUMBER},
            nombre_out:{dir: oracledb.BIND_OUT, type: oracledb.STRING},
            apellido_out: {dir: oracledb.BIND_OUT, type: oracledb.STRING},
            correo_out: {dir: oracledb.BIND_OUT, type: oracledb.STRING},
            cargo_out:{dir: oracledb.BIND_OUT, type: oracledb.NUMBER},
            id_contrato: {dir: oracledb.BIND_OUT, type: oracledb.NUMBER},
            id_servicio: {dir: oracledb.BIND_OUT, type: oracledb.NUMBER}
            
            
        }
        let query = `CALL SP_OBTENER_USUARIO_AUTENTICADO(:id, :nombre_out, :apellido_out, :correo_out, :cargo_out, :id_contrato, :id_servicio)`;
        var result = await connection.execute(query, params);
        res.status(200).json({
            ok:true,
            msg:'Sesión iniciada con éxito',
            usuario: result.outBinds
        });

    }
    catch(error){
        res.status(500).json({
            ok:false,
            msg:error.message
        })
    }

    finally{
        if(result){
            try {
                await connection.close();
                console.log('closed usuario autenticado');
            } catch (error) {  
                console.log(error.message);
            }
        }
    }
}