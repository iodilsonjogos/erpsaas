const db = require('../config/db');

// Listar agendamentos – sempre filtra pela empresa do usuário autenticado
exports.listar = async (req, res) => {
  try {
    const empresaId = req.user.empresa_id;

    const [rows] = await db.query(
      `SELECT 
        agenda.id,
        clientes.nome AS cliente,
        profissionais.nome AS profissional,
        servicos.nome AS servico,
        agenda.data,
        agenda.hora,
        agenda.status
      FROM agenda
      LEFT JOIN clientes ON agenda.cliente_id = clientes.id
      LEFT JOIN profissionais ON agenda.profissional_id = profissionais.id
      LEFT JOIN servicos ON agenda.servico_id = servicos.id
      WHERE agenda.empresa_id = ?
      ORDER BY agenda.data DESC, agenda.hora DESC
      `,
      [empresaId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar agendamentos' });
  }
};

// Criar agendamento – empresa_id do usuário autenticado
exports.criar = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  const { cliente_id, profissional_id, servico_id, data, hora, status, observacoes } = req.body;
  await db.query(
    `INSERT INTO agenda (empresa_id, cliente_id, profissional_id, servico_id, data, hora, status, observacoes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [empresa_id, cliente_id, profissional_id, servico_id, data, hora, status, observacoes]
  );
  res.status(201).json({ mensagem: "Agendamento criado com sucesso!" });
};

// Atualizar agendamento – só permite na empresa do usuário
exports.atualizar = async (req, res) => {
  const { id } = req.params;
  const empresa_id = req.user.empresa_id;
  const { cliente_id, profissional_id, servico_id, data, hora, status, observacoes } = req.body;
  await db.query(
    `UPDATE agenda SET cliente_id=?, profissional_id=?, servico_id=?, data=?, hora=?, status=?, observacoes=? 
     WHERE id=? AND empresa_id=?`,
    [cliente_id, profissional_id, servico_id, data, hora, status, observacoes, id, empresa_id]
  );
  res.json({ mensagem: "Agendamento atualizado com sucesso!" });
};

// Excluir agendamento – só permite na empresa do usuário
exports.deletar = async (req, res) => {
  const { id } = req.params;
  const empresa_id = req.user.empresa_id;
  await db.query(`DELETE FROM agenda WHERE id=? AND empresa_id=?`, [id, empresa_id]);
  res.json({ mensagem: "Agendamento excluído com sucesso!" });
};
