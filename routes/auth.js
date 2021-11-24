//Rutas para crear Usuarios
const express = require('express');
const router = express.Router();
const {check} = require('express-validator');

const authController = require('../controllers/authController');
const authMiddle = require('../middlewares/authMiddle');

//Autenticar Usuario
// /api/auth

router.post('/',

    [
        check('email', 'Agrega un correo válido').isEmail(),
        check('password', 'El password debe de ser mínimo de 6 caracteres').isLength({min:6})
    ],
    authController.autenticarUsuario
)

router.get('/',
    authMiddle,
    authController.usuarioAutenticado
)

module.exports = router;
