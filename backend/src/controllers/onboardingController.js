const db = require('../config/db');

// GET /api/onboarding/progresso
exports.getProgresso = async (req, res) => {
  const usuario_id = req.user.id;
  const empresa_id = req.user.empresa_id;
  try {
    const [rows] = await db.query(
      "SELECT passo, concluido FROM onboarding_progresso WHERE usuario_id = ? AND empresa_id = ?",
      [usuario_id, empresa_id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar progresso do onboarding" });
  }
};

// POST /api/onboarding/concluir-passo { passo: "upload_logo" }
exports.concluirPasso = async (req, res) => {
  const usuario_id = req.user.id;
  const empresa_id = req.user.empresa_id;
  const { passo } = req.body;
  try {
    // Faz insert ou update
    await db.query(
      `INSERT INTO onboarding_progresso (usuario_id, empresa_id, passo, concluido)
        VALUES (?, ?, ?, 1)
        ON DUPLICATE KEY UPDATE concluido = 1, atualizado_em = CURRENT_TIMESTAMP
      `,
      [usuario_id, empresa_id, passo]
    );
    res.json({ sucesso: true });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao salvar progresso" });
  }
};
