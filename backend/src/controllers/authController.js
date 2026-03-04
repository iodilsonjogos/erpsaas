const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const usuarioCtrl = require("./usuarioController");

// Cadastro público (empresa + admin + trial)
exports.register = usuarioCtrl.registrarPublico;

// Login (gera token válido e compatível com middleware)
exports.login = usuarioCtrl.login;

// Opcional: rota "me" (requer middleware auth antes)
exports.me = async (req, res) => {
  return res.json({
    usuario: req.user || null,
  });
};
