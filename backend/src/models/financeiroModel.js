const db = require('../config/db');

module.exports = {
  async listar(empresa_id) {
    const [rows] = await db.query(
      'SELECT * FROM financeiro_lancamentos WHERE empresa_id = ? ORDER BY data DESC, id DESC',
      [empresa_id]
    );
    return rows;
  },

  async criar(data) {
    const [result] = await db.query(
      `INSERT INTO financeiro_lancamentos (empresa_id, tipo, descricao, categoria, valor, data, forma_pagamento, observacoes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.empresa_id, data.tipo, data.descricao, data.categoria, data.valor,
        data.data, data.forma_pagamento, data.observacoes
      ]
    );
    return { id: result.insertId, ...data };
  },

  async atualizar(id, empresa_id, data) {
    await db.query(
      `UPDATE financeiro_lancamentos SET tipo=?, descricao=?, categoria=?, valor=?, data=?, forma_pagamento=?, observacoes=?
       WHERE id=? AND empresa_id=?`,
      [
        data.tipo, data.descricao, data.categoria, data.valor, data.data,
        data.forma_pagamento, data.observacoes, id, empresa_id
      ]
    );
  },

  async remover(id, empresa_id) {
    await db.query(
      `DELETE FROM financeiro_lancamentos WHERE id=? AND empresa_id=?`,
      [id, empresa_id]
    );
  }
};
