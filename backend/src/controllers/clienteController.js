// /backend/src/controllers/clienteController.js
const db = require('../config/db');

exports.listar = async (req, res) => {
  try {
    const [clientes] = await db.query(
      'SELECT id, empresa_id, nome, telefone, email, observacoes, created_at FROM clientes WHERE empresa_id = ?',
      [req.user.empresa_id]
    );
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar clientes', error: error.message });
  }
};

exports.detalhar = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, empresa_id, nome, telefone, email, observacoes, created_at FROM clientes WHERE id = ? AND empresa_id = ? LIMIT 1',
      [req.params.id, req.user.empresa_id]
    );
    if (!rows.length) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao detalhar cliente', error: error.message });
  }
};

exports.criar = async (req, res) => {
  try {
    const { nome, telefone, email, observacoes } = req.body;
    const [result] = await db.query(
      'INSERT INTO clientes (empresa_id, nome, telefone, email, observacoes) VALUES (?, ?, ?, ?, ?)',
      [req.user.empresa_id, nome, telefone, email, observacoes]
    );
    res.status(201).json({ id: result.insertId, nome, telefone, email, observacoes });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar cliente', error: error.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { nome, telefone, email, observacoes } = req.body;
    const { id } = req.params;
    const [result] = await db.query(
      'UPDATE clientes SET nome=?, telefone=?, email=?, observacoes=? WHERE id=? AND empresa_id=?',
      [nome, telefone, email, observacoes, id, req.user.empresa_id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.json({ mensagem: "Cliente atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar cliente', error: error.message });
  }
};

exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query(
      'DELETE FROM clientes WHERE id=? AND empresa_id=?',
      [id, req.user.empresa_id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.json({ mensagem: "Cliente excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir cliente', error: error.message });
  }
};
