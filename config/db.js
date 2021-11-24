const oracledb = require('oracledb');

var password = "PORTAFOLIO";

async function checkConnection(){
    try{
        connection = await oracledb.getConnection({
            user:"PORTAFOLIO",
            password: password,
            connectString: "localhost:1521/xe"
        });

        return connection;
    }
    catch(err){
        console.log(err.message);
    }
    // finally{
    //     if(connection){
    //         try{
    //             await connection.close();
    //             console.log('Close connection success');
    //         }
    //         catch(err){
    //             console.log(err.message)
    //         }
    //     }
    // }
}

module.exports = checkConnection;