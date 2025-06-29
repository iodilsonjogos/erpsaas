
const db = require('../config/db');

module.exports = {
  async listar(empresa_id) {
    const [rows] = await db.query(
      'SELECT * FROM agendamentos WHERE empresa_id = ? ORDER BY data, hora',
      [empresa_id]
    );
    return rows;
  },

  async criar(data) {
    const [result] = await db.query(
      `INSERT INTO agendamentos (empresa_id, cliente_id, profissional_id, usuario_id, servico, valor, data, hora, obs, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.empresa_id, data.cliente_id, data.profissional_id, data.usuario_id,
        data.servico, data.valor, data.data, data.hora, data.obs, data.status || 'agendado'
      ]
    );
    return { id: result.insertId, ...data };
  },

  async atualizar(id, empresa_id, data) {
    await db.query(
      `UPDATE agendamentos SET cliente_id=?, profissional_id=?, usuario_id=?, servico=?, valor=?, data=?, hora=?, obs=?, status=?
       WHERE id=? AND empresa_id=?`,
      [
        data.cliente_id, data.profissional_id, data.usuario_id, data.servico, data.valor,
        data.data, data.hora, data.obs, data.status, id, empresa_id
      ]
    );
  },

  async remover(id, empresa_id) {
    await db.query(
      `DELETE FROM agendamentos WHERE id=? AND empresa_id=?`,
      [id, empresa_id]
    );
  }
};