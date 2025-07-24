
const db = require('../config/db');

// Listar vendas com cliente
exports.listar = async (req, res) => {
  try {
    const [vendas] = await db.query(
      `SELECT 
         v.id, 
         v.empresa_id, 
         v.cliente_id, 
         v.data, 
         v.valor_total, 
         v.observacao, 
         c.nome as cliente_nome 
       FROM vendas v
       LEFT JOIN clientes c ON v.cliente_id = c.id`
    );
    res.json(vendas);
  } catch (err) {
    console.error('Erro ao listar vendas:', err);
    res.status(500).json({ mensagem: 'Erro ao listar vendas' });
  }
};

// Criar venda com itens
exports.criar = async (req, res) => {
  try {
    const { empresa_id, cliente_id, data, observacao, itens } = req.body;
    let valor_total = 0;

    for (let item of itens) {
      item.subtotal = parseFloat(item.quantidade) * parseFloat(item.preco_unitario);
      valor_total += item.subtotal;
    }

    const [result] = await db.query(
      'INSERT INTO vendas (empresa_id, cliente_id, data, valor_total, observacao) VALUES (?, ?, ?, ?, ?)',
      [empresa_id, cliente_id, data, valor_total, observacao]
    );

    const venda_id = result.insertId;

    for (let item of itens) {
      await db.query(
        'INSERT INTO venda_itens (venda_id, produto_id, quantidade, valor) VALUES (?, ?, ?, ?)',
        [venda_id, item.produto_id, item.quantidade, item.subtotal]
      );
    }

    res.status(201).json({ mensagem: "Venda cadastrada com sucesso!" });
  } catch (err) {
    console.error('Erro ao criar venda:', err);
    res.status(500).json({ mensagem: 'Erro ao cadastrar venda' });
  }
};

// Atualizar venda (não atualiza itens)
exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { empresa_id, cliente_id, data, observacao } = req.body;

    await db.query(
      'UPDATE vendas SET empresa_id=?, cliente_id=?, data=?, observacao=? WHERE id=?',
      [empresa_id, cliente_id, data, observacao, id]
    );

    res.json({ mensagem: "Venda atualizada com sucesso!" });
  } catch (err) {
    console.error('Erro ao atualizar venda:', err);
    res.status(500).json({ mensagem: "Erro ao atualizar venda" });
  }
};

// Excluir venda
exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM vendas WHERE id=?', [id]);
    res.json({ mensagem: "Venda excluída com sucesso!" });
  } catch (err) {
    console.error('Erro ao excluir venda:', err);
    res.status(500).json({ mensagem: "Erro ao excluir venda" });
  }
};
