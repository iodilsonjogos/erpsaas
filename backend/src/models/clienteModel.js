const db = require('../config/db');

module.exports = {
  async listar(empresa_id) {
    const [rows] = await db.query(
      'SELECT * FROM clientes WHERE empresa_id = ? ORDER BY nome',
      [empresa_id]
    );
    return rows;
  },

  async criar(data) {
    const [result] = await db.query(
      `INSERT INTO clientes (empresa_id, nome, telefone, email, observacoes)
       VALUES (?, ?, ?, ?, ?)`,
      [
        data.empresa_id, data.nome, data.telefone, data.email, data.observacoes
      ]
    );
    return { id: result.insertId, ...data };
  },

  async atualizar(id, empresa_id, data) {
    await db.query(
      `UPDATE clientes SET nome=?, telefone=?, email=?, observacoes=?
       WHERE id=? AND empresa_id=?`,
      [
        data.nome, data.telefone, data.email, data.observacoes, id, empresa_id
      ]
    );
  },

  async remover(id, empresa_id) {
    await db.query(
      `DELETE FROM clientes WHERE id=? AND empresa_id=?`,
      [id, empresa_id]
    );
  }
};
