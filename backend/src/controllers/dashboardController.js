const db = require("../config/db");

exports.dashboardResumo = async (req, res) => {
  try {
    const empresa_id = req.user.empresa_id;

    // Total de clientes
    const [[clientes]] = await db.query(
      "SELECT COUNT(*) as total FROM clientes WHERE empresa_id = ?",
      [empresa_id],
    );

    // Total de profissionais
    const [[profissionais]] = await db.query(
      "SELECT COUNT(*) as total FROM profissionais WHERE empresa_id = ?",
      [empresa_id],
    );

    // Total de produtos
    const [[produtos]] = await db.query(
      "SELECT COUNT(*) as total FROM produtos WHERE empresa_id = ?",
      [empresa_id],
    );

    // Total de vendas
    const [[vendas]] = await db.query(
      "SELECT COUNT(*) as total FROM vendas WHERE empresa_id = ?",
      [empresa_id],
    );

    // Total de serviços
    const [[servicos]] = await db.query(
      "SELECT COUNT(*) as total FROM servicos WHERE empresa_id = ?",
      [empresa_id],
    );

    // Agenda de hoje
    const [agendaHoje] = await db.query(
      `SELECT a.*, c.nome as cliente_nome, p.nome as profissional_nome, s.nome as servico_nome
       FROM agenda a
       LEFT JOIN clientes c ON a.cliente_id = c.id
       LEFT JOIN profissionais p ON a.profissional_id = p.id
       LEFT JOIN servicos s ON a.servico_id = s.id
       WHERE a.empresa_id = ? AND a.data = CURDATE()
       ORDER BY a.hora ASC`,
      [empresa_id],
    );

    res.json({
      clientes: clientes.total,
      profissionais: profissionais.total,
      produtos: produtos.total,
      vendas: vendas.total,
      servicos: servicos.total,
      agendaHoje,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao carregar dashboard", error: error.message });
  }
};
