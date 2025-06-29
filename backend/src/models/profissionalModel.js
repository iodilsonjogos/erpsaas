const db = require('../config/db');

module.exports = {
  async listar(empresa_id) {
    const [rows] = await db.query(
      'SELECT * FROM profissionais WHERE empresa_id = ? ORDER BY nome',
      [empresa_id]
    );
    return rows;
  },

  async criar(data) {
    const [result] = await db.query(
      `INSERT INTO profissionais (empresa_id, nome, especialidade, ativo)
       VALUES (?, ?, ?, ?)`,
      [
        data.empresa_id, data.nome, data.especialidade, data.ativo ?? 1
      ]
    );
    return { id: result.insertId, ...data };
  },

  async atualizar(id, empresa_id, data) {
    await db.query(
      `UPDATE profissionais SET nome=?, especialidade=?, ativo=?
       WHERE id=? AND empresa_id=?`,
      [
        data.nome, data.especialidade, data.ativo, id, empresa_id
      ]
    );
  },

  async remover(id, empresa_id) {
    await db.query(
      `DELETE FROM profissionais WHERE id=? AND empresa_id=?`,
      [id, empresa_id]
    );
  }
};
