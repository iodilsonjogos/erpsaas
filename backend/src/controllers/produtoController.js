const db = require('../config/db');

// Listar produtos
exports.listar = async (req, res) => {
  try {
    const [produtos] = await db.query(
      'SELECT id, empresa_id, nome, categoria, unidade, preco, estoque, status FROM produtos WHERE empresa_id = ?',
      [req.user.empresa_id]
    );
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar produtos', error: error.message });
  }
};

// Criar produto
exports.criar = async (req, res) => {
  try {
    const { nome, categoria, unidade, preco, estoque } = req.body;
    const status = 'ativo';
    await db.query(
      'INSERT INTO produtos (empresa_id, nome, categoria, unidade, preco, estoque, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [req.user.empresa_id, nome, categoria, unidade, preco, estoque, status]
    );
    res.status(201).json({ mensagem: "Produto cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar produto', error: error.message });
  }
};

// Atualizar produto
exports.atualizar = async (req, res) => {
  try {
    const { nome, categoria, unidade, preco, estoque, status } = req.body;
    const { id } = req.params;
    await db.query(
      'UPDATE produtos SET nome=?, categoria=?, unidade=?, preco=?, estoque=?, status=? WHERE id=? AND empresa_id=?',
      [nome, categoria, unidade, preco, estoque, status, id, req.user.empresa_id]
    );
    res.json({ mensagem: "Produto atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar produto', error: error.message });
  }
};

// Excluir produto
exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM produtos WHERE id=? AND empresa_id=?', [id, req.user.empresa_id]);
    res.json({ mensagem: "Produto excluído com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir produto', error: error.message });
  }
};
