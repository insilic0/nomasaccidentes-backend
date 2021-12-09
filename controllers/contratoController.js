const moment = require('moment');
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

exports.agregarContrato = async (req, res) =>{

    try {
        connection = await oracledb.getConnection({
            user: process.env.USER,
            password: process.env.PASSWORD,
            connectString:"localhost:1521/xe"
        });

        let {fecha_fin_contrato, id_rep_legal, id_funcionario,
            motivo_servicio, monto_servicio, desc_servicio
        } = req.body;

        fecha_fin_contrato = moment(fecha_fin_contrato).format('DD/MM/YYYY');

        let params = {
            fecha_fin_contrato: {val: fecha_fin_contrato, dir: oracledb.BIND_IN, type: oracledb.STRING},
            id_rep_legal: {val: id_rep_legal, dir: oracledb.BIND_IN, type: oracledb.STRING},
            id_funcionario: {val: id_funcionario, dir: oracledb.BIND_IN, type: oracledb.STRING},
            motivo_servicio: {val: motivo_servicio, dir: oracledb.BIND_IN, type: oracledb.STRING},
            monto_servicio: {val: monto_servicio, dir: oracledb.BIND_IN, type: oracledb.NUMBER},
            desc_servicio: {val: desc_servicio, dir: oracledb.BIND_IN, type: oracledb.STRING}
        };

        console.log(req.body);
        let query = `CALL SP_AGREGAR_CONTRATO(:fecha_fin_contrato, :id_rep_legal, :id_funcionario, :motivo_servicio, :monto_servicio, :desc_servicio)`;
        var result = await connection.execute(query, params);

        res.json({
            ok: true,
            msg:"Contrato creado correctamente"
        });

    } catch (error) {
        res.send(error.message);
    }
    finally{
        if(result){
            try {
                await connection.close();
                console.log('closed contrato');
            } catch (error) {  
                console.log(error.message);
            }
        }
    }

}