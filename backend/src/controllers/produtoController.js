const db = require('../config/db');

// Listar produtos
exports.listar = async (req, res) => {
  const [produtos] = await db.query(
    'SELECT id, empresa_id, nome, categoria, unidade, preco_custo, preco_venda, estoque, observacoes, created_at FROM produtos'
  );
  res.json(produtos);
};

// Criar produto
exports.criar = async (req, res) => {
  const { empresa_id, nome, categoria, unidade, preco_custo, preco_venda, estoque, observacoes } = req.body;
  await db.query(
    'INSERT INTO produtos (empresa_id, nome, categoria, unidade, preco_custo, preco_venda, estoque, observacoes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [empresa_id, nome, categoria, unidade, preco_custo, preco_venda, estoque, observacoes]
  );
  res.status(201).json({ mensagem: "Produto cadastrado com sucesso!" });
};

// Atualizar produto
exports.atualizar = async (req, res) => {
  const { id } = req.params;
  const { empresa_id, nome, categoria, unidade, preco_custo, preco_venda, estoque, observacoes } = req.body;
  await db.query(
    'UPDATE produtos SET empresa_id=?, nome=?, categoria=?, unidade=?, preco_custo=?, preco_venda=?, estoque=?, observacoes=? WHERE id=?',
    [empresa_id, nome, categoria, unidade, preco_custo, preco_venda, estoque, observacoes, id]
  );
  res.json({ mensagem: "Produto atualizado com sucesso!" });
};

// Excluir produto
exports.deletar = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM produtos WHERE id=?', [id]);
  res.json({ mensagem: "Produto excluído com sucesso!" });
};
