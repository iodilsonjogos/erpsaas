const db = require('../config/db');

exports.resumo = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  const [clientes] = await db.query('SELECT COUNT(*) as total FROM clientes WHERE empresa_id=?', [empresa_id]);
  const [receita] = await db.query("SELECT SUM(valor_total) as total FROM vendas WHERE empresa_id=? AND MONTH(data) = MONTH(NOW())", [empresa_id]);
  const [agendas] = await db.query("SELECT COUNT(*) as total FROM agendamentos WHERE empresa_id=? AND data >= CURDATE()", [empresa_id]);
  res.json({
    totalClientes: clientes[0].total,
    receitaMes: receita[0].total || 0,
    proximosAgendamentos: agendas[0].total
  });
};

exports.resumo = async (req, res) => {
  res.json({ mensagem: "Dashboard funcionando!" });
};
