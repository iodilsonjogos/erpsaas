// backend/src/routes/usuarioRoutes.js
const express = require("express");
const router = express.Router();
const usuarioCtrl = require("../controllers/usuarioController");
const auth = require("../middlewares/auth");

// ✅ Blindagem: se alguém abrir no navegador (GET), responde 405 (não cai em /:id)
router.get("/login", (req, res) =>
  res.status(405).json({
    error:
      "Método não permitido. Use POST /api/usuarios/login com JSON {email, senha}.",
  }),
);

router.get("/register", (req, res) =>
  res.status(405).json({
    error:
      "Método não permitido. Use POST /api/usuarios/register com JSON de cadastro.",
  }),
);

// Registro público (sem token)
router.post("/register", usuarioCtrl.registrarPublico);

// Login público (sem token)
router.post("/login", usuarioCtrl.login);

// Rotas protegidas (com token)
router.get("/", auth, usuarioCtrl.listar);
router.get("/:id", auth, usuarioCtrl.detalhar);
router.put("/:id", auth, usuarioCtrl.atualizar);
router.delete("/:id", auth, usuarioCtrl.deletar);

module.exports = router;
