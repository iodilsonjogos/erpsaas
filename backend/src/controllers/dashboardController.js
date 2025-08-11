const db = require('../config/db');

exports.resumo = async (req, res) => {

  const empresa_id = req.user.empresa_id;
  const [clientes] = await db.query('SELECT COUNT(*) as total FROM clientes WHERE empresa_id=?', [empresa_id]);
  const [receita] = await db.query("SELECT SUM(valor_total) as total FROM vendas WHERE empresa_id=? AND MONTH(data) = MONTH(NOW())", [empresa_id]);
  const [agendas] = await db.query("SELECT COUNT(*) as total FROM agenda WHERE empresa_id=? AND data >= CURDATE()", [empresa_id]);
  res.json({
    totalClientes: clientes[0].total,
    receitaMes: receita[0].total || 0,
    proximosAgendamentos: agendas[0].total
  });
};

exports.vendasPorMes = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  // Retorna os últimos 6 meses
  const [rows] = await db.query(
    `SELECT DATE_FORMAT(data, '%Y-%m') as mes, SUM(valor_total) as total 
     FROM vendas 
     WHERE empresa_id=? AND data >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
     GROUP BY mes
     ORDER BY mes ASC`, [empresa_id]
  );
  res.json(rows);
};

exports.produtosMaisVendidos = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  const [rows] = await db.query(
    `SELECT p.nome, SUM(vi.quantidade) as total 
     FROM venda_itens vi
     JOIN produtos p ON vi.produto_id = p.id
     JOIN vendas v ON v.id = vi.venda_id
     WHERE v.empresa_id=? 
     GROUP BY p.nome
     ORDER BY total DESC
     LIMIT 5`, [empresa_id]
  );
  res.json(rows);
};
