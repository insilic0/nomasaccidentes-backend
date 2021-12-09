const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

exports.agregarAsesoria = async(req,res) =>{
    try {
        connection = await oracledb.getConnection({
            user: process.env.USER,
            password: process.env.PASSWORD,
            connectString: "localhost:1521/xe"
        });

        let {id_servicio, motivo, cantidad_visitas, es_fiscalizacion, comentarios} = req.body;
        cantidad_visitas = parseInt(cantidad_visitas, 10);

        console.log(cantidad_visitas);

        let params ={
            id_servicio: {val: id_servicio, dir: oracledb.BIND_IN, type: oracledb.NUMBER},
            motivo: {val: motivo, dir: oracledb.BIND_IN, type: oracledb.STRING},
            cantidad_visitas: {val: cantidad_visitas, dir: oracledb.BIND_IN, type: oracledb.NUMBER},
            es_fiscalizacion: {val: es_fiscalizacion, dir: oracledb.BIND_IN, type: oracledb.STRING},
            comentarios: {val: comentarios, dir: oracledb.BIND_IN, type: oracledb.STRING},
        }

        let query = `CALL SP_AGREGAR_ASESORIA(:id_servicio, :motivo, :cantidad_visitas, :es_fiscalizacion, :comentarios)`;

        var result = connection.execute(query, params);

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
                console.log('closed cliente controller');
            } catch (error) {  
                console.log(error.message);
            }
        }
    }
}