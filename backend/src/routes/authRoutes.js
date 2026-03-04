// backend/src/routes/authRoutes.js
const express = require("express");
const router = express.Router();

const authCtrl = require("../controllers/authController");
const authMiddleware = require("../middlewares/auth");

// Bloqueios de GET (pra não confundir teste pelo navegador)
router.get("/login", (req, res) => {
  res.status(405).json({
    error:
      "Método não permitido. Use POST /api/auth/login com JSON {email, senha}.",
  });
});

router.get("/register", (req, res) => {
  res.status(405).json({
    error:
      "Método não permitido. Use POST /api/auth/register com JSON de cadastro.",
  });
});

// Cadastro público
router.post("/register", authCtrl.register);

// Login público
router.post("/login", authCtrl.login);

// Rota protegida (debug útil)
router.get("/me", authMiddleware, authCtrl.me);

module.exports = router;
