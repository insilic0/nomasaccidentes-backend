//Rutas para crear capacitaciones

const express = require('express');
const router = express.Router();

const capacitacionController = require('../controllers/capacitacionController');
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
    capacitacionController.agregarCapacitacion
);
module.exports = router;


