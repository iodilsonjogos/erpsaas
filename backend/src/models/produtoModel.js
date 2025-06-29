const db = require('../config/db');

module.exports = {
  async listar(empresa_id) {
    const [rows] = await db.query(
      'SELECT * FROM produtos WHERE empresa_id = ? ORDER BY nome',
      [empresa_id]
    );
    return rows;
  },

  async criar(data) {
    const [result] = await db.query(
      `INSERT INTO produtos (empresa_id, nome, categoria, unidade, preco_custo, preco_venda, estoque, observacoes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.empresa_id, data.nome, data.categoria, data.unidade,
        data.preco_custo, data.preco_venda, data.estoque, data.observacoes
      ]
    );
    return { id: result.insertId, ...data };
  },

  async atualizar(id, empresa_id, data) {
    await db.query(
      `UPDATE produtos SET nome=?, categoria=?, unidade=?, preco_custo=?, preco_venda=?, estoque=?, observacoes=?
       WHERE id=? AND empresa_id=?`,
      [
        data.nome, data.categoria, data.unidade, data.preco_custo, data.preco_venda,
        data.estoque, data.observacoes, id, empresa_id
      ]
    );
  },

  async remover(id, empresa_id) {
    await db.query(
      `DELETE FROM produtos WHERE id=? AND empresa_id=?`,
      [id, empresa_id]
    );
  }
};

