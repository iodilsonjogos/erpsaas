const db = require('../config/db');

// Listar serviços
exports.listar = async (req, res) => {
  const [servicos] = await db.query(
    'SELECT id, empresa_id, nome, descricao, preco, ativo, created_at FROM servicos'
  );
  res.json(servicos);
};

// Criar serviço
exports.criar = async (req, res) => {
  const { empresa_id, nome, descricao, preco, ativo } = req.body;
  await db.query(
    'INSERT INTO servicos (empresa_id, nome, descricao, preco, ativo) VALUES (?, ?, ?, ?, ?)',
    [empresa_id, nome, descricao, preco, ativo]
  );
  res.status(201).json({ mensagem: "Serviço cadastrado com sucesso!" });
};

// Atualizar serviço
exports.atualizar = async (req, res) => {
  const { id } = req.params;
  const { empresa_id, nome, descricao, preco, ativo } = req.body;
  await db.query(
    'UPDATE servicos SET empresa_id=?, nome=?, descricao=?, preco=?, ativo=? WHERE id=?',
    [empresa_id, nome, descricao, preco, ativo, id]
  );
  res.json({ mensagem: "Serviço atualizado com sucesso!" });
};

// Excluir serviço
exports.deletar = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM servicos WHERE id=?', [id]);
  res.json({ mensagem: "Serviço excluído com sucesso!" });
};
