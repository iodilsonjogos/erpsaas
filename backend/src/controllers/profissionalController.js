// /backend/src/controllers/profissionalController.js
const db = require('../config/db');

exports.listar = async (req, res) => {
  try {
    const [profissionais] = await db.query(
      'SELECT id, empresa_id, nome, email, telefone, especialidade, ativo, created_at FROM profissionais WHERE empresa_id = ?',
      [req.user.empresa_id]
    );
    res.json(profissionais);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar profissionais', error: error.message });
  }
};

exports.detalhar = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, empresa_id, nome, email, telefone, especialidade, ativo, created_at FROM profissionais WHERE id = ? AND empresa_id = ? LIMIT 1',
      [req.params.id, req.user.empresa_id]
    );
    if (!rows.length) {
      return res.status(404).json({ message: 'Profissional não encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao detalhar profissional', error: error.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const { nome, email, telefone, especialidade, ativo } = req.body;
    const [result] = await db.query(
      'INSERT INTO profissionais (empresa_id, nome, email, telefone, especialidade, ativo) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.empresa_id, nome, email, telefone, especialidade, ativo]
    );
    res.status(201).json({ id: result.insertId, nome, email, telefone, especialidade, ativo });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar profissional', error: error.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { nome, email, telefone, especialidade, ativo } = req.body;
    const { id } = req.params;
    const [result] = await db.query(
      'UPDATE profissionais SET nome=?, email=?, telefone=?, especialidade=?, ativo=? WHERE id=? AND empresa_id=?',
      [nome, email, telefone, especialidade, ativo, id, req.user.empresa_id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Profissional não encontrado' });
    }
    res.json({ mensagem: "Profissional atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar profissional', error: error.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(
      'DELETE FROM profissionais WHERE id=? AND empresa_id=?',
      [id, req.user.empresa_id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Profissional não encontrado' });
    }
    res.json({ mensagem: "Profissional excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir profissional', error: error.message });
  }
};
