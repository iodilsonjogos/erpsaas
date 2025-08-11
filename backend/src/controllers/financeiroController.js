const db = require('../config/db');

// Listar lançamentos financeiros (SOMENTE da empresa do usuário)
exports.listar = async (req, res) => {
  const [lancamentos] = await db.query(
    `SELECT id, empresa_id, tipo, categoria, descricao, valor, data, observacoes, created_at 
     FROM financeiro WHERE empresa_id = ?`,
    [req.user.empresa_id]
  );
  res.json(lancamentos);
};

// Criar lançamento financeiro
exports.criar = async (req, res) => {
  const empresa_id = req.user.empresa_id; // CORRETO: sempre via JWT
  const { tipo, categoria, descricao, valor, data, observacoes } = req.body;
  await db.query(
    `INSERT INTO financeiro (empresa_id, tipo, categoria, descricao, valor, data, observacoes)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [empresa_id, tipo, categoria, descricao, valor, data, observacoes]
  );
  res.status(201).json({ mensagem: "Lançamento financeiro cadastrado com sucesso!" });
};

// Atualizar lançamento financeiro (SÓ DA PRÓPRIA EMPRESA)
exports.atualizar = async (req, res) => {
  const { id } = req.params;
  const empresa_id = req.user.empresa_id;
  const { tipo, categoria, descricao, valor, data, observacoes } = req.body;
  await db.query(
    `UPDATE financeiro SET tipo=?, categoria=?, descricao=?, valor=?, data=?, observacoes=? WHERE id=? AND empresa_id=?`,
    [tipo, categoria, descricao, valor, data, observacoes, id, empresa_id]
  );
  res.json({ mensagem: "Lançamento financeiro atualizado com sucesso!" });
};

// Excluir lançamento financeiro (SÓ DA PRÓPRIA EMPRESA)
exports.deletar = async (req, res) => {
  const { id } = req.params;
  const empresa_id = req.user.empresa_id;
  await db.query(`DELETE FROM financeiro WHERE id=? AND empresa_id=?`, [id, empresa_id]);
  res.json({ mensagem: "Lançamento financeiro excluído com sucesso!" });
};
