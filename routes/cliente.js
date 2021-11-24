//Rutas para crear Usuarios

const express = require('express');
const router = express.Router();

const clienteController = require('../controllers/clienteController');
const authMiddle = require('../middlewares/authMiddle');

//Crear un usuario
// /api/auth
// router.post('/',
//     usuarioController.agregarCliente
// )

// router.get('/',
//     authMiddle,
//     authController.usuarioAutenticado
// );

//Agregar Cliente cara faxera faxerita
router.post('/',
    clienteController.agregarUsuario
);



module.exports = router;
