const db = require('../config/db');
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');

// Relatório Vendas JSON simples
exports.relatorioVendas = async (req, res) => {
  try {
    // Espera receber dataInicio e dataFim via query params ou body
    const { dataInicio, dataFim } = req.query;
    const empresa_id = req.user.empresa_id;

    if (!dataInicio || !dataFim) {
      return res.status(400).json({ message: 'Informe dataInicio e dataFim no formato YYYY-MM-DD.' });
    }

    const [relatorio] = await db.query(
      `SELECT 
         v.id, 
         v.data, 
         c.nome as cliente_nome, 
         v.valor_total
       FROM vendas v
       LEFT JOIN clientes c ON v.cliente_id = c.id
       WHERE v.empresa_id = ? 
         AND v.data BETWEEN ? AND ?
       ORDER BY v.data DESC`,
      [empresa_id, dataInicio, dataFim]
    );
  res.json(relatorio);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao gerar relatório de vendas', error: error.message });
  }
};

// Relatório Financeiro JSON simples
exports.relatorioFinanceiro = async (req, res) => {
  const { data_ini, data_fim } = req.query;
  const empresa_id = req.user.empresa_id;
  const [dados] = await db.query(
    `SELECT id, data, tipo, categoria, descricao, valor
     FROM financeiro
     WHERE empresa_id = ? AND data BETWEEN ? AND ?`,
    [empresa_id, data_ini, data_fim]
  );
  res.json(dados);
};

// Relatório de vendas por período (JSON ou exportação)
exports.vendasPeriodo = async (req, res) => {
  const { data_ini, data_fim } = req.query;
  const empresa_id = req.user.empresa_id;
  const [vendas] = await db.query(
    `SELECT v.id, v.data, c.nome as cliente_nome, v.total
     FROM vendas v
     LEFT JOIN clientes c ON v.cliente_id = c.id
     WHERE v.empresa_id = ? AND v.data BETWEEN ? AND ?`,
    [empresa_id, data_ini, data_fim]
  );
  res.json(vendas);
};

exports.relatorioVendasExcel = async (req, res) => {
  const { data_ini, data_fim } = req.query;
  const empresa_id = req.user.empresa_id;
  const [vendas] = await db.query(
    `SELECT v.id, v.data, c.nome as cliente_nome, v.total
     FROM vendas v
     LEFT JOIN clientes c ON v.cliente_id = c.id
     WHERE v.empresa_id = ? AND v.data BETWEEN ? AND ?`,
    [empresa_id, data_ini, data_fim]
  );
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Vendas');
  sheet.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Data', key: 'data', width: 15 },
    { header: 'Cliente', key: 'cliente_nome', width: 32 },
    { header: 'Total', key: 'total', width: 16 }
  ];
  vendas.forEach(venda => sheet.addRow(venda));
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader('Content-Disposition', 'attachment; filename="vendas.xlsx"');
  await workbook.xlsx.write(res);
  res.end();
};

exports.relatorioVendasPDF = async (req, res) => {
  const { data_ini, data_fim } = req.query;
  const empresa_id = req.user.empresa_id;
  const [vendas] = await db.query(
    `SELECT v.id, v.data, c.nome as cliente_nome, v.total
     FROM vendas v
     LEFT JOIN clientes c ON v.cliente_id = c.id
     WHERE v.empresa_id = ? AND v.data BETWEEN ? AND ?`,
    [empresa_id, data_ini, data_fim]
  );
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="vendas.pdf"');
  doc.pipe(res);

  doc.fontSize(18).text('Relatório de Vendas', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Período: ${data_ini} a ${data_fim}`);
  doc.moveDown();

  vendas.forEach((venda) => {
    doc
      .fontSize(10)
      .text(
        `ID: ${venda.id} | Data: ${venda.data} | Cliente: ${venda.cliente_nome} | Total: R$ ${(Number(venda.total) || 0).toFixed(2)}`
      );
  });

  doc.end();
};

// Relatório Financeiro - Excel
exports.relatorioFinanceiroExcel = async (req, res) => {
  const { data_ini, data_fim } = req.query;
  const empresa_id = req.user.empresa_id;
  const [dados] = await db.query(
    `SELECT id, data, tipo, categoria, descricao, valor FROM financeiro WHERE empresa_id = ? AND data BETWEEN ? AND ?`,
    [empresa_id, data_ini, data_fim]
  );
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Financeiro');
  sheet.columns = [
    { header: 'ID', key: 'id', width: 10 },
    { header: 'Data', key: 'data', width: 15 },
    { header: 'Tipo', key: 'tipo', width: 10 },
    { header: 'Categoria', key: 'categoria', width: 20 },
    { header: 'Descrição', key: 'descricao', width: 32 },
    { header: 'Valor', key: 'valor', width: 16 }
  ];
  dados.forEach(lanc => sheet.addRow(lanc));
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader('Content-Disposition', 'attachment; filename="financeiro.xlsx"');
  await workbook.xlsx.write(res);
  res.end();
};

exports.relatorioFinanceiroPDF = async (req, res) => {
  const { data_ini, data_fim } = req.query;
  const empresa_id = req.user.empresa_id;
  const [dados] = await db.query(
    `SELECT id, data, tipo, categoria, descricao, valor FROM financeiro WHERE empresa_id = ? AND data BETWEEN ? AND ?`,
    [empresa_id, data_ini, data_fim]
  );
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="financeiro.pdf"');
  doc.pipe(res);

  doc.fontSize(18).text('Relatório Financeiro', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Período: ${data_ini} a ${data_fim}`);
  doc.moveDown();

  dados.forEach(lanc => {
    doc.fontSize(10).text(
      `ID: ${lanc.id} | Data: ${lanc.data} | Tipo: ${lanc.tipo} | Categoria: ${lanc.categoria} | Descrição: ${lanc.descricao} | Valor: R$ ${(Number(lanc.valor) || 0).toFixed(2)}`
    );
  });

  doc.end();
};

// Relatório Produtos (tudo da empresa logada)
exports.relatorioProdutos = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  const [rows] = await db.query(
    `SELECT id, nome, categoria, unidade, preco_venda, estoque FROM produtos WHERE empresa_id = ?`,
    [empresa_id]
  );
  res.json(rows);
};
exports.relatorioProdutosExcel = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  const [rows] = await db.query(
    `SELECT id, nome, categoria, unidade, preco_venda, estoque FROM produtos WHERE empresa_id = ?`,
    [empresa_id]
  );
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Produtos');
  sheet.addRow(['ID', 'Nome', 'Categoria', 'Unidade', 'Preço Venda', 'Estoque']);
  rows.forEach(p => {
    sheet.addRow([p.id, p.nome, p.categoria, p.unidade, p.preco_venda, p.estoque]);
  });
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename="relatorio_produtos.xlsx"');
  await workbook.xlsx.write(res);
  res.end();
};
exports.relatorioProdutosPDF = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  const [rows] = await db.query(
    `SELECT id, nome, categoria, unidade, preco_venda, estoque FROM produtos WHERE empresa_id = ?`,
    [empresa_id]
  );
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="relatorio_produtos.pdf"');
  doc.pipe(res);
  doc.fontSize(18).text('Relatório de Produtos', { align: 'center' });
  doc.moveDown();
  rows.forEach(p => {
    doc.fontSize(12).text(`ID: ${p.id} | Nome: ${p.nome} | Categoria: ${p.categoria} | Preço Venda: R$${p.preco_venda} | Estoque: ${p.estoque}`);
  });
  doc.end();
};

// Relatório Agenda
exports.relatorioAgenda = async (req, res) => {
  const { data_ini, data_fim } = req.query;
  const empresa_id = req.user.empresa_id;
  const [rows] = await db.query(
    `SELECT a.id, a.data, a.hora, a.status, a.observacoes, c.nome as cliente_nome, p.nome as profissional_nome, s.nome as servico_nome
     FROM agenda a
     LEFT JOIN clientes c ON a.cliente_id = c.id
     LEFT JOIN profissionais p ON a.profissional_id = p.id
     LEFT JOIN servicos s ON a.servico_id = s.id
     WHERE a.empresa_id = ? AND a.data BETWEEN ? AND ?`,
    [empresa_id, data_ini, data_fim]
  );
  res.json(rows);
};
exports.relatorioAgendaExcel = async (req, res) => {
  const { data_ini, data_fim } = req.query;
  const empresa_id = req.user.empresa_id;
  const [rows] = await db.query(
    `SELECT a.id, a.data, a.hora, a.status, a.observacoes, c.nome as cliente_nome, p.nome as profissional_nome, s.nome as servico_nome
     FROM agenda a
     LEFT JOIN clientes c ON a.cliente_id = c.id
     LEFT JOIN profissionais p ON a.profissional_id = p.id
     LEFT JOIN servicos s ON a.servico_id = s.id
     WHERE a.empresa_id = ? AND a.data BETWEEN ? AND ?`,
    [empresa_id, data_ini, data_fim]
  );
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Agenda');
  sheet.addRow(['ID', 'Data', 'Hora', 'Cliente', 'Profissional', 'Serviço', 'Status', 'Observações']);
  rows.forEach(a => {
    sheet.addRow([a.id, a.data, a.hora, a.cliente_nome, a.profissional_nome, a.servico_nome, a.status, a.observacoes]);
  });
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename="relatorio_agenda.xlsx"');
  await workbook.xlsx.write(res);
  res.end();
};
exports.relatorioAgendaPDF = async (req, res) => {
  const { data_ini, data_fim } = req.query;
  const empresa_id = req.user.empresa_id;
  const [rows] = await db.query(
    `SELECT a.id, a.data, a.hora, a.status, a.observacoes, c.nome as cliente_nome, p.nome as profissional_nome, s.nome as servico_nome
     FROM agenda a
     LEFT JOIN clientes c ON a.cliente_id = c.id
     LEFT JOIN profissionais p ON a.profissional_id = p.id
     LEFT JOIN servicos s ON a.servico_id = s.id
     WHERE a.empresa_id = ? AND a.data BETWEEN ? AND ?`,
    [empresa_id, data_ini, data_fim]
  );
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="relatorio_agenda.pdf"');
  doc.pipe(res);
  doc.fontSize(18).text('Relatório de Agenda', { align: 'center' });
  doc.moveDown();
  rows.forEach(a => {
    doc.fontSize(12).text(`ID: ${a.id} | Data: ${a.data} | Hora: ${a.hora} | Cliente: ${a.cliente_nome} | Profissional: ${a.profissional_nome} | Serviço: ${a.servico_nome} | Status: ${a.status} | Obs: ${a.observacoes}`);
  });
  doc.end();
};
