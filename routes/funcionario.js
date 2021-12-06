//Rutas para crear Usuarios

const { Router } = require('express');
const express = require('express');
const router = express.Router();

const funcionarioController = require('../controllers/funcionarioController');
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
    funcionarioController.agregarFuncionario
);

router.post('/obtenerFuncionario',
    funcionarioController.obtenerFuncionario
);



module.exports = router;
