const moment = require('moment');
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

exports.agregarCapacitacion = async(req, res) =>{
    try {
        connection = await oracledb.getConnection({
            user: process.env.USER,
            password: process.env.PASSWORD,
            connectString: "localhost:1521/xe"
        });

        let {id_servicio, fecha_capacitacion, motivo_capacitacion, asistentes} = req.body;
        
        fecha_capacitacion = moment(fecha_capacitacion).format('DD/MM/YYYY');
        let params ={
            id_servicio: {val: id_servicio, dir: oracledb.BIND_IN, type: oracledb.NUMBER},
            fecha_capacitacion: {val: fecha_capacitacion, dir: oracledb.BIND_IN, type: oracledb.STRING},
            motivo_capacitacion: {val: motivo_capacitacion, dir: oracledb.BIND_IN, type: oracledb.STRING},
            asistentes: {val: asistentes, dir: oracledb.BIND_IN, type: oracledb.STRING},
        }

        let query =`CALL SP_CREAR_CAPACITACION(:id_servicio, :fecha_capacitacion, :motivo_capacitacion, :asistentes)`;

        var result = await connection.execute(query, params);

        res.status(200).json({
            ok: true,
            msg:'Capacitación creada correctamente'
        })
    } catch (error) {
        console.log(error.message);
    }
    finally{
        if(result){
            try {
                await connection.close();
                console.log('closed capacitacion');
            } catch (error) {  
                console.log(error.message);
            }
        }
    }
}