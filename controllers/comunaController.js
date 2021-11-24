const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

exports.obtenerComunas = async (req, res) =>{

    try {
        connection = await oracledb.getConnection({
            user: process.env.USER,
            password: process.env.PASSWORD,
            connectString:"localhost:1521/xe"
        });

        let query = `SELECT * FROM COMUNA ORDER BY NOMBRE_COMUNA ASC`;

        var result = await connection.execute(query);

        res.json({
            comunas: result.rows
        });

    } catch (error) {
        res.send(error.message);
    }

}