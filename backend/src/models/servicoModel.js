const db = require('../config/db');

module.exports = {
  async listar(empresa_id) {
    const [rows] = await db.query(
      'SELECT * FROM servicos WHERE empresa_id = ? ORDER BY nome',
      [empresa_id]
    );
    return rows;
  },

  async criar(data) {
    const [result] = await db.query(
      `INSERT INTO servicos (empresa_id, nome, preco, duracao_minutos)
       VALUES (?, ?, ?, ?)`,
      [
        data.empresa_id, data.nome, data.preco, data.duracao_minutos
      ]
    );
    return { id: result.insertId, ...data };
  },

  async atualizar(id, empresa_id, data) {
    await db.query(
      `UPDATE servicos SET nome=?, preco=?, duracao_minutos=?
       WHERE id=? AND empresa_id=?`,
      [
        data.nome, data.preco, data.duracao_minutos, id, empresa_id
      ]
    );
  },

  async remover(id, empresa_id) {
    await db.query(
      `DELETE FROM servicos WHERE id=? AND empresa_id=?`,
      [id, empresa_id]
    );
  }
};
