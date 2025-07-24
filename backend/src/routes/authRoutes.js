const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');

// Cadastro público (empresa/autônomo)
router.post('/register', authCtrl.register);

// Login público
router.post('/login', authCtrl.login);

module.exports = router;
