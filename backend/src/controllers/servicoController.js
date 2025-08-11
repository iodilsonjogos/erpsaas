const db = require('../config/db');

// LISTAR serviços – sempre filtra por empresa do usuário autenticado
exports.listar = async (req, res) => {
  try {
    const [servicos] = await db.query(
      'SELECT id, empresa_id, nome, categoria, preco, duracao, status FROM servicos WHERE empresa_id = ?',
      [req.user.empresa_id]
    );
    res.json(servicos);
  } catch (err) {
    console.error('Erro ao listar serviços:', err);
    res.status(500).json({ mensagem: 'Erro ao listar serviços' });
  }
};

// CRIAR serviço – empresa_id sempre do usuário autenticado
exports.criar = async (req, res) => {
  try {
    const empresa_id = req.user.empresa_id; // sempre via JWT
    const { nome, categoria, preco, duracao, status } = req.body;
    
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

// ATUALIZAR serviço – só pode atualizar serviço da empresa do usuário autenticado
exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, categoria, preco, duracao, status } = req.body;

    await db.query(
      'UPDATE servicos SET nome=?, categoria=?, preco=?, duracao=?, status=? WHERE id=? AND empresa_id=?',
      [nome, categoria, preco, duracao, status, id, req.user.empresa_id]
    );

    res.json({ mensagem: 'Serviço atualizado com sucesso!' });
  } catch (err) {
    console.error('Erro ao atualizar serviço:', err);
    res.status(500).json({ mensagem: 'Erro ao atualizar serviço' });
  }
};

// EXCLUIR serviço – só pode deletar serviço da própria empresa
exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM servicos WHERE id=? AND empresa_id=?', [id, req.user.empresa_id]);
    res.json({ mensagem: 'Serviço excluído com sucesso!' });
  } catch (err) {
    console.error('Erro ao excluir serviço:', err);
    res.status(500).json({ mensagem: 'Erro ao excluir serviço' });
  }
};
