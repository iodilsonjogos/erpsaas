const db = require('../config/db');
const bcrypt = require('bcryptjs');

exports.getPerfil = async (req, res) => {
  const [rows] = await db.query('SELECT id, nome, email FROM usuarios WHERE id=?', [req.user.id]);
  res.json(rows[0]);
};

exports.atualizarPerfil = async (req, res) => {
  const { nome, email, senha } = req.body;
  if (senha) {
    const hash = await bcrypt.hash(senha, 10);
    await db.query('UPDATE usuarios SET nome=?, email=?, senha=? WHERE id=?', [nome, email, hash, req.user.id]);
  } else {
    await db.query('UPDATE usuarios SET nome=?, email=? WHERE id=?', [nome, email, req.user.id]);
  }
  res.status(204).send();
};
