
const db = require('../config/db');

// LISTAR serviços
exports.listar = async (req, res) => {
  try {
    const [servicos] = await db.query(
      'SELECT id, empresa_id, nome, categoria, preco, duracao, status FROM servicos'
    );
    res.json(servicos);
  } catch (err) {
    console.error('Erro ao listar serviços:', err);
    res.status(500).json({ mensagem: 'Erro ao listar serviços' });
  }
};

// CRIAR serviço
exports.criar = async (req, res) => {
  try {
    const { empresa_id, nome, categoria, preco, duracao, status } = req.body;

    await db.query(
      'INSERT INTO servicos (empresa_id, nome, categoria, preco, duracao, status) VALUES (?, ?, ?, ?, ?, ?)',
      [empresa_id, nome, categoria, preco, duracao, status || 'ativo']
    );

    res.status(201).json({ mensagem: 'Serviço cadastrado com sucesso!' });
  } catch (err) {
    console.error('Erro ao criar serviço:', err);
    res.status(500).json({ mensagem: 'Erro ao cadastrar serviço' });
  }
};

// ATUALIZAR serviço
exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, categoria, preco, duracao, status } = req.body;

    await db.query(
      'UPDATE servicos SET nome=?, categoria=?, preco=?, duracao=?, status=? WHERE id=?',
      [nome, categoria, preco, duracao, status, id]
    );

    res.json({ mensagem: 'Serviço atualizado com sucesso!' });
  } catch (err) {
    console.error('Erro ao atualizar serviço:', err);
    res.status(500).json({ mensagem: 'Erro ao atualizar serviço' });
  }
};

// EXCLUIR serviço
exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM servicos WHERE id=?', [id]);
    res.json({ mensagem: 'Serviço excluído com sucesso!' });
  } catch (err) {
    console.error('Erro ao excluir serviço:', err);
    res.status(500).json({ mensagem: 'Erro ao excluir serviço' });
  }
};
