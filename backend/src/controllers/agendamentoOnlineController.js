// /backend/src/controllers/agendamentoOnlineController.js

const db = require('../config/db');

// Listar agendamentos do cliente logado
exports.meus = async (req, res) => {
  try {
    const [agendas] = await db.query(
      'SELECT * FROM agenda WHERE cliente_id = ? AND empresa_id = ? ORDER BY data DESC, hora DESC',
      [req.user.id, req.user.empresa_id]
    );
    res.json(agendas);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar seus agendamentos', error: error.message });
  }
};

// Buscar horários disponíveis para um profissional/serviço em uma data
exports.horariosDisponiveis = async (req, res) => {
  try {
    const { profissional_id, data, servico_id } = req.query;
    if (!profissional_id || !data) {
      return res.status(400).json({ message: 'Profissional e data obrigatórios' });
    }
    // Exemplo: busca horários ocupados
    const [ocupados] = await db.query(
      'SELECT hora FROM agenda WHERE profissional_id = ? AND data = ? AND empresa_id = ?',
      [profissional_id, data, req.user.empresa_id]
    );
    // Horários possíveis: 08:00 às 18:00 (exemplo), cada 30min
    const horarios = [];
    for (let h = 8; h <= 17; h++) {
      horarios.push(`${String(h).padStart(2, '0')}:00`);
      horarios.push(`${String(h).padStart(2, '0')}:30`);
    }
    const ocupadosSet = new Set(ocupados.map(o => o.hora));
    const livres = horarios.filter(h => !ocupadosSet.has(h));
    res.json(livres);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar horários', error: error.message });
  }
};

// Criar agendamento online

exports.criar = async (req, res) => {
  try {
    const { profissional_id, servico_id, data, hora, observacoes } = req.body;

    // Busca o tipo de confirmação da empresa do cliente
    const [[empresa]] = await db.query(
      'SELECT confirmacao_agendamento FROM empresas WHERE id = ?',
      [req.user.empresa_id]
    );
    const status = (empresa && empresa.confirmacao_agendamento === 'automatica') ? 'Confirmado' : 'Pendente';

    await db.query(
      'INSERT INTO agenda (empresa_id, cliente_id, profissional_id, servico_id, data, hora, observacoes, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [req.user.empresa_id, req.user.id, profissional_id, servico_id, data, hora, observacoes, status]
    );
    res.status(201).json({ mensagem: 'Agendamento realizado com sucesso!', status });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao agendar', error: error.message });
  }
};