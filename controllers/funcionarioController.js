const { parse } = require('dotenv');
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

exports.agregarFuncionario = async (req, res) =>{

    try {
        connection = await oracledb.getConnection({
            user: process.env.USER,
            password: process.env.PASSWORD,
            connectString:"localhost:1521/xe"
        });

        let {runFuncionario, primerNombre, segundoNombre, apellidoPaterno,
               apellidoMaterno, correoElectronico, cargo, userName, password
        } = req.body;

        const dv_funcionario = runFuncionario.charAt(runFuncionario.length-1);
        const cargo2 = parseInt(cargo);

        console.log(req.body);

        let params = {
            run_funcionario: {val: runFuncionario, dir: oracledb.BIND_IN, type: oracledb.STRING},
            dv_funcionario: {val: dv_funcionario, dir: oracledb.BIND_IN, type: oracledb.STRING},
            primer_nombre: {val: primerNombre, dir: oracledb.BIND_IN, type: oracledb.STRING},
            segundo_nombre: {val: segundoNombre, dir: oracledb.BIND_IN, type: oracledb.STRING},
            apellido_paterno: {val: apellidoPaterno, dir: oracledb.BIND_IN, type: oracledb.STRING},
            apellido_materno: {val: apellidoMaterno, dir: oracledb.BIND_IN, type: oracledb.STRING},
            correo_electronico: {val: correoElectronico, dir: oracledb.BIND_IN, type: oracledb.STRING},
            cargo: {val: cargo2, dir: oracledb.BIND_IN, type: oracledb.NUMBER},
            nombre_usuario: {val: userName, dir: oracledb.BIND_IN, type: oracledb.STRING},
            password: {val: password, dir: oracledb.BIND_IN, type: oracledb.STRING}
        };

        let query = `CALL SP_AGREGAR_FUNCIONARIO(:run_funcionario, :dv_funcionario, :primer_nombre, :segundo_nombre, :apellido_paterno, :apellido_materno, :correo_electronico, :cargo, :nombre_usuario, :password)`;
        var result = await connection.execute(query, params);

        res.json({
            ok: true
        });

    } catch (error) {
        res.send(error.message);
    }
    finally{
        if(result){
            try {
                await connection.close();
                console.log('closed funcionario');
            } catch (error) {  
                console.log(error.message);
            }
        }
    }

}