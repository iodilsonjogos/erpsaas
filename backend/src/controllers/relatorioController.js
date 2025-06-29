const db = require('../config/db');
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');

// Relatório de Vendas
exports.relatorioVendas = async (req, res) => {
  // ...como mostrado antes
};
exports.relatorioVendasExcel = async (req, res) => {
  // ...como mostrado antes
};
exports.relatorioVendasPDF = async (req, res) => {
  // ...como mostrado antes
};

// Relatório Financeiro
exports.relatorioFinanceiro = async (req, res) => {
  // ...como mostrado antes
};
exports.relatorioFinanceiroExcel = async (req, res) => {
  // ...como mostrado antes
};
exports.relatorioFinanceiroPDF = async (req, res) => {
  // ...como mostrado antes
};

// Relatório Produtos
exports.relatorioProdutos = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  const [rows] = await db.query(
    `SELECT * FROM produtos WHERE empresa_id = ?`,
    [empresa_id]
  );
  res.json(rows);
};
exports.relatorioProdutosExcel = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  const [rows] = await db.query(
    `SELECT * FROM produtos WHERE empresa_id = ?`,
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
    `SELECT * FROM produtos WHERE empresa_id = ?`,
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
  const { inicio, fim } = req.query;
  const empresa_id = req.user.empresa_id;
  const [rows] = await db.query(
    `SELECT a.*, c.nome as cliente_nome, p.nome as profissional_nome
     FROM agendamentos a
     LEFT JOIN clientes c ON a.cliente_id = c.id
     LEFT JOIN profissionais p ON a.profissional_id = p.id
     WHERE a.empresa_id = ? AND a.data BETWEEN ? AND ?`,
    [empresa_id, inicio, fim]
  );
  res.json(rows);
};
exports.relatorioAgendaExcel = async (req, res) => {
  const { inicio, fim } = req.query;
  const empresa_id = req.user.empresa_id;
  const [rows] = await db.query(
    `SELECT a.*, c.nome as cliente_nome, p.nome as profissional_nome
     FROM agendamentos a
     LEFT JOIN clientes c ON a.cliente_id = c.id
     LEFT JOIN profissionais p ON a.profissional_id = p.id
     WHERE a.empresa_id = ? AND a.data BETWEEN ? AND ?`,
    [empresa_id, inicio, fim]
  );
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Agenda');
  sheet.addRow(['ID', 'Cliente', 'Profissional', 'Serviço', 'Data', 'Hora', 'Status']);
  rows.forEach(a => {
    sheet.addRow([a.id, a.cliente_nome, a.profissional_nome, a.servico, a.data, a.hora, a.status]);
  });
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename="relatorio_agenda.xlsx"');
  await workbook.xlsx.write(res);
  res.end();
};
exports.relatorioAgendaPDF = async (req, res) => {
  const { inicio, fim } = req.query;
  const empresa_id = req.user.empresa_id;
  const [rows] = await db.query(
    `SELECT a.*, c.nome as cliente_nome, p.nome as profissional_nome
     FROM agendamentos a
     LEFT JOIN clientes c ON a.cliente_id = c.id
     LEFT JOIN profissionais p ON a.profissional_id = p.id
     WHERE a.empresa_id = ? AND a.data BETWEEN ? AND ?`,
    [empresa_id, inicio, fim]
  );
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="relatorio_agenda.pdf"');
  doc.pipe(res);
  doc.fontSize(18).text('Relatório de Agenda', { align: 'center' });
  doc.moveDown();
  rows.forEach(a => {
    doc.fontSize(12).text(`ID: ${a.id} | Cliente: ${a.cliente_nome} | Profissional: ${a.profissional_nome} | Serviço: ${a.servico} | Data: ${a.data} | Hora: ${a.hora} | Status: ${a.status}`);
  });
  doc.end();
};
