const db = require('../config/db');

const homeCtrl = {};

// Buscar lista de espera
homeCtrl.getListaEspera = async (req, res) => {
  try {
    const lista = await db.query('SELECT * FROM lista_espera');
    res.status(200).json(lista[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar lista de espera' });
  }
};

// Adicionar novo item à lista de espera
homeCtrl.adicionarListaEspera = (req, res) => {
  const { nome_cliente, telefone, servico_id, profissional_id, data_entrada, observacao } = req.body;
  const query = 'INSERT INTO lista_espera (nome_cliente, telefone, servico_id, profissional_id, data_entrada, observacao) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [nome_cliente, telefone, servico_id || null, profissional_id || null, data_entrada, observacao], (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao adicionar na lista de espera.' });
    res.json({ id: result.insertId, status: 'pendente' });
  });
};

// Confirmar item da lista de espera
homeCtrl.confirmarListaEspera = (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE lista_espera SET status = "confirmado" WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao confirmar atendimento.' });
    if (result.affectedRows === 0) return res.status(404).json({ erro: 'Item não encontrado.' });
    res.json({ status: 'confirmado' });
  });
};

// Excluir item da lista de espera
homeCtrl.excluirListaEspera = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM lista_espera WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ erro: 'Erro ao excluir item da lista de espera.' });
    if (result.affectedRows === 0) return res.status(404).json({ erro: 'Item não encontrado.' });
    res.json({ status: 'excluído' });
  });
};
// Buscar profissionais ativos
homeCtrl.getProfissionaisAtivos = async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      "SELECT id, nome FROM profissionais WHERE status = 'ativo'"
    );
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar profissionais ativos:", error);
    res.status(500).json({ error: error.message });
  }
};

// Buscar agendamentos do dia
homeCtrl.getAgendamentosDia = async (req, res) => {
  const { data } = req.query;
  if (!data) return res.status(400).json({ error: "Data obrigatória" });

  try {
    const [rows] = await db.promise().query(
      `SELECT a.id, a.hora, c.nome AS cliente, p.nome AS profissional, s.nome AS servico
       FROM agenda a
       JOIN clientes c ON c.id = a.cliente_id
       JOIN profissionais p ON p.id = a.profissional_id
       JOIN servicos s ON s.id = a.servico_id
       WHERE a.data = ?`, [data]
    );
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar agendamentos do dia:", error);
    res.status(500).json({ error: "Erro ao buscar agendamentos" });
  }
};

// Buscar datas especiais
homeCtrl.getDatasEspeciais = async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      "SELECT data, descricao FROM datas_especiais WHERE ativo = 1"
    );
    res.json(rows);
  } catch (error) {
    console.error("Erro ao buscar datas especiais:", error);
    res.status(500).json({ error: "Erro ao buscar datas especiais" });
  }
};

module.exports = homeCtrl;
