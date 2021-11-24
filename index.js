const express = require('express');
const cors = require('cors');
const { autoCommit } = require('oracledb');

//Crear el servidor

const app = express();
require('dotenv').config({ path: 'variables.env'});

//Habilitar json
app.use(express.json({extended : true}));

//Habilitar cors
app.use(cors());

//Puerto de app
const PORT = process.env.PORT || 4000;

//Importar Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/cliente', require('./routes/cliente'));
app.use('/api/comunas', require('./routes/comuna'));

app.listen(PORT, () =>{
    console.log(`Corriendo en puerto ${PORT}`);
});

