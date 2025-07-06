const db = require('../config/db');

// Listar agendamentos
exports.listar = async (req, res) => {
  const [agendas] = await db.query(
    `SELECT id, empresa_id, cliente_id, profissional_id, servico_id, data, hora, status, observacoes, created_at FROM agenda`
  );
  res.json(agendas);
};

// Criar agendamento
exports.criar = async (req, res) => {
  const { empresa_id, cliente_id, profissional_id, servico_id, data, hora, status, observacoes } = req.body;
  await db.query(
    `INSERT INTO agenda (empresa_id, cliente_id, profissional_id, servico_id, data, hora, status, observacoes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [empresa_id, cliente_id, profissional_id, servico_id, data, hora, status, observacoes]
  );
  res.status(201).json({ mensagem: "Agendamento criado com sucesso!" });
};

// Atualizar agendamento
exports.atualizar = async (req, res) => {
  const { id } = req.params;
  const { empresa_id, cliente_id, profissional_id, servico_id, data, hora, status, observacoes } = req.body;
  await db.query(
    `UPDATE agenda SET empresa_id=?, cliente_id=?, profissional_id=?, servico_id=?, data=?, hora=?, status=?, observacoes=? WHERE id=?`,
    [empresa_id, cliente_id, profissional_id, servico_id, data, hora, status, observacoes, id]
  );
  res.json({ mensagem: "Agendamento atualizado com sucesso!" });
};

// Excluir agendamento
exports.deletar = async (req, res) => {
  const { id } = req.params;
  await db.query(`DELETE FROM agenda WHERE id=?`, [id]);
  res.json({ mensagem: "Agendamento excluído com sucesso!" });
};
