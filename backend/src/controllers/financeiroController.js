const db = require('../config/db');

// Listar lançamentos financeiros
exports.listar = async (req, res) => {
  const [lancamentos] = await db.query(
    `SELECT id, empresa_id, tipo, categoria, descricao, valor, data, observacoes, created_at FROM financeiro`
  );
  res.json(lancamentos);
};

// Criar lançamento financeiro
exports.criar = async (req, res) => {
  const { empresa_id, tipo, categoria, descricao, valor, data, observacoes } = req.body;
  await db.query(
    `INSERT INTO financeiro (empresa_id, tipo, categoria, descricao, valor, data, observacoes)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [empresa_id, tipo, categoria, descricao, valor, data, observacoes]
  );
  res.status(201).json({ mensagem: "Lançamento financeiro cadastrado com sucesso!" });
};

// Atualizar lançamento
exports.atualizar = async (req, res) => {
  const { id } = req.params;
  const { empresa_id, tipo, categoria, descricao, valor, data, observacoes } = req.body;
  await db.query(
    `UPDATE financeiro SET empresa_id=?, tipo=?, categoria=?, descricao=?, valor=?, data=?, observacoes=? WHERE id=?`,
    [empresa_id, tipo, categoria, descricao, valor, data, observacoes, id]
  );
  res.json({ mensagem: "Lançamento financeiro atualizado com sucesso!" });
};

// Excluir lançamento
exports.deletar = async (req, res) => {
  const { id } = req.params;
  await db.query(`DELETE FROM financeiro WHERE id=?`, [id]);
  res.json({ mensagem: "Lançamento financeiro excluído com sucesso!" });
};
