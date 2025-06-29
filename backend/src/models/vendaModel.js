const db = require('../config/db');

module.exports = {
  // Listar vendas + seus itens (nome do produto)
  async listar(empresa_id) {
    const [vendas] = await db.query(
      'SELECT * FROM vendas WHERE empresa_id = ? ORDER BY data DESC',
      [empresa_id]
    );
    // Para cada venda, buscar os itens
    for (const venda of vendas) {
      const [itens] = await db.query(
        `SELECT vi.*, p.nome as produto_nome FROM venda_itens vi
         LEFT JOIN produtos p ON vi.produto_id = p.id
         WHERE vi.venda_id = ?`, [venda.id]
      );
      venda.itens = itens;
    }
    return vendas;
  },

  // Criar venda e seus itens
  async criar(data, itens) {
    const [result] = await db.query(
      `INSERT INTO vendas (empresa_id, cliente_id, usuario_id, valor_total, status, observacoes)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        data.empresa_id, data.cliente_id, data.usuario_id,
        data.valor_total, data.status ?? 'aberta', data.observacoes
      ]
    );
    const venda_id = result.insertId;
    for (const item of itens) {
      await db.query(
        `INSERT INTO venda_itens (venda_id, produto_id, quantidade, preco_unitario)
         VALUES (?, ?, ?, ?)`,
        [venda_id, item.produto_id, item.quantidade, item.preco_unitario]
      );
    }
    return { id: venda_id, ...data, itens };
  },

  async atualizar(id, empresa_id, data) {
    // Atualiza somente dados da venda, não os itens (adapte se necessário)
    await db.query(
      `UPDATE vendas SET cliente_id=?, usuario_id=?, valor_total=?, status=?, observacoes=?
       WHERE id=? AND empresa_id=?`,
      [
        data.cliente_id, data.usuario_id, data.valor_total, data.status, data.observacoes, id, empresa_id
      ]
    );
  },

  async remover(id, empresa_id) {
    await db.query(
      `DELETE FROM venda_itens WHERE venda_id=?`, [id]
    );
    await db.query(
      `DELETE FROM vendas WHERE id=? AND empresa_id=?`,
      [id, empresa_id]
    );
  }
};