const express = require('express');
const router = express.Router();

const comunaController = require('../controllers/comunaController');

//Obtener las comunas
// /api/comunas

router.get('/', 
    comunaController.obtenerComunas
);


module.exports = router;