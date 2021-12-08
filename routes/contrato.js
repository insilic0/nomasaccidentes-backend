//Rutas para crear Usuarios

const express = require('express');
const router = express.Router();
const contratoController = require('../controllers/contratoController');

//Crear un usuario
// /api/auth
// router.post('/',
//     usuarioController.agregarCliente
// )

// router.get('/',
//     authMiddle,
//     authController.usuarioAutenticado
// );

//Agregar Contrato
router.post('/',
    contratoController.agregarContrato
);

module.exports = router;
