const express = require("express");
const router = express.Router();

const usuarioCtrl = require("../controllers/usuarioController");
const auth = require("../middlewares/auth");
const acl = require("../middlewares/acl");

// Login
router.post("/login", usuarioCtrl.login);

// Registro público
router.post("/register", usuarioCtrl.registrarPublico);

// Recuperação de senha
router.post("/recuperar-senha", usuarioCtrl.recuperarSenha);

// Reset senha
router.post("/resetar-senha/:token", usuarioCtrl.resetarSenha);

// Protegidas (admin)
router.post("/", auth, acl(["admin"]), usuarioCtrl.criar);
router.get("/", auth, acl(["admin"]), usuarioCtrl.listar);
router.get("/:id", auth, acl(["admin"]), usuarioCtrl.detalhar);
router.put("/:id", auth, acl(["admin"]), usuarioCtrl.atualizar);
router.delete("/:id", auth, acl(["admin"]), usuarioCtrl.deletar);

module.exports = router;
