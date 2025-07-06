const db = require('../config/db');

// Listar vendas (com itens)
exports.listar = async (req, res) => {
  const [vendas] = await db.query(
    'SELECT v.id, v.empresa_id, v.cliente_id, v.data, v.total, v.observacoes, v.created_at, c.nome as cliente_nome ' +
    'FROM vendas v LEFT JOIN clientes c ON v.cliente_id = c.id'
  );
  for (let venda of vendas) {
    const [itens] = await db.query(
      'SELECT vi.id, vi.produto_id, p.nome as produto_nome, vi.quantidade, vi.preco_unitario, vi.subtotal ' +
      'FROM venda_itens vi LEFT JOIN produtos p ON vi.produto_id = p.id WHERE vi.venda_id=?', [venda.id]
    );
    venda.itens = itens;
  }
  res.json(vendas);
};

// Criar venda
exports.criar = async (req, res) => {
  const { empresa_id, cliente_id, data, observacoes, itens } = req.body;
  // Calcula total
  let total = 0;
  for (let item of itens) {
    item.subtotal = parseFloat(item.quantidade) * parseFloat(item.preco_unitario);
    total += item.subtotal;
  }
  // Cria venda
  const [result] = await db.query(
    'INSERT INTO vendas (empresa_id, cliente_id, data, total, observacoes) VALUES (?, ?, ?, ?, ?)',
    [empresa_id, cliente_id, data, total, observacoes]
  );
  const venda_id = result.insertId;
  // Cria itens
  for (let item of itens) {
    await db.query(
      'INSERT INTO venda_itens (venda_id, produto_id, quantidade, preco_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
      [venda_id, item.produto_id, item.quantidade, item.preco_unitario, item.subtotal]
    );
  }
  res.status(201).json({ mensagem: "Venda cadastrada com sucesso!" });
};

// Atualizar venda (apenas dados principais)
exports.atualizar = async (req, res) => {
  const { id } = req.params;
  const { empresa_id, cliente_id, data, observacoes } = req.body;
  await db.query(
    'UPDATE vendas SET empresa_id=?, cliente_id=?, data=?, observacoes=? WHERE id=?',
    [empresa_id, cliente_id, data, observacoes, id]
  );
  res.json({ mensagem: "Venda atualizada com sucesso!" });
};

// Excluir venda (deleta também os itens pelo ON DELETE CASCADE)
exports.deletar = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM vendas WHERE id=?', [id]);
  res.json({ mensagem: "Venda excluída com sucesso!" });
};
