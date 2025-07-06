const express = require('express');
const router = express.Router();
const relatorioCtrl = require('../controllers/relatorioController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * /relatorios/vendas:
 *   get:
 *     summary: Relatório de vendas por período (JSON simples)
 *     tags: [Relatórios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: data_ini
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Data inicial (YYYY-MM-DD)
 *       - in: query
 *         name: data_fim
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Data final (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Lista de vendas no período
 */
router.get('/vendas', auth, relatorioCtrl.relatorioVendas);

/**
 * @swagger
 * /relatorios/financeiro:
 *   get:
 *     summary: Relatório financeiro por período (JSON simples)
 *     tags: [Relatórios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: data_ini
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Data inicial (YYYY-MM-DD)
 *       - in: query
 *         name: data_fim
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Data final (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Lista de lançamentos financeiros do período
 */
router.get('/financeiro', auth, relatorioCtrl.relatorioFinanceiro);

/**
 * @swagger
 * /relatorios/vendas/excel:
 *   get:
 *     summary: Exporta vendas por período em Excel
 *     tags: [Relatórios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: data_ini
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Data inicial (YYYY-MM-DD)
 *       - in: query
 *         name: data_fim
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Data final (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Download do arquivo Excel
 */
router.get('/vendas/excel', auth, relatorioCtrl.relatorioVendasExcel);

/**
 * @swagger
 * /relatorios/vendas/pdf:
 *   get:
 *     summary: Exporta vendas por período em PDF
 *     tags: [Relatórios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: data_ini
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Data inicial (YYYY-MM-DD)
 *       - in: query
 *         name: data_fim
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Data final (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Download do arquivo PDF
 */
router.get('/vendas/pdf', auth, relatorioCtrl.relatorioVendasPDF);

/**
 * @swagger
 * /relatorios/financeiro/excel:
 *   get:
 *     summary: Exporta financeiro por período em Excel
 *     tags: [Relatórios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: data_ini
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Data inicial (YYYY-MM-DD)
 *       - in: query
 *         name: data_fim
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Data final (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Download do arquivo Excel
 */
router.get('/financeiro/excel', auth, relatorioCtrl.relatorioFinanceiroExcel);

/**
 * @swagger
 * /relatorios/financeiro/pdf:
 *   get:
 *     summary: Exporta financeiro por período em PDF
 *     tags: [Relatórios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: data_ini
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Data inicial (YYYY-MM-DD)
 *       - in: query
 *         name: data_fim
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Data final (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Download do arquivo PDF
 */
router.get('/financeiro/pdf', auth, relatorioCtrl.relatorioFinanceiroPDF);

/**
 * @swagger
 * /relatorios/produtos:
 *   get:
 *     summary: Relatório de produtos da empresa (JSON simples)
 *     tags: [Relatórios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
router.get('/produtos', auth, relatorioCtrl.relatorioProdutos);

/**
 * @swagger
 * /relatorios/produtos/excel:
 *   get:
 *     summary: Exporta relatório de produtos em Excel
 *     tags: [Relatórios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Download do arquivo Excel
 */
router.get('/produtos/excel', auth, relatorioCtrl.relatorioProdutosExcel);

/**
 * @swagger
 * /relatorios/produtos/pdf:
 *   get:
 *     summary: Exporta relatório de produtos em PDF
 *     tags: [Relatórios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Download do arquivo PDF
 */
router.get('/produtos/pdf', auth, relatorioCtrl.relatorioProdutosPDF);

/**
 * @swagger
 * /relatorios/agenda:
 *   get:
 *     summary: Relatório da agenda por período (JSON simples)
 *     tags: [Relatórios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: data_ini
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Data inicial (YYYY-MM-DD)
 *       - in: query
 *         name: data_fim
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Data final (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Lista de compromissos da agenda
 */
router.get('/agenda', auth, relatorioCtrl.relatorioAgenda);

/**
 * @swagger
 * /relatorios/agenda/excel:
 *   get:
 *     summary: Exporta relatório de agenda em Excel
 *     tags: [Relatórios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: data_ini
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Data inicial (YYYY-MM-DD)
 *       - in: query
 *         name: data_fim
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Data final (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Download do arquivo Excel
 */
router.get('/agenda/excel', auth, relatorioCtrl.relatorioAgendaExcel);

/**
 * @swagger
 * /relatorios/agenda/pdf:
 *   get:
 *     summary: Exporta relatório de agenda em PDF
 *     tags: [Relatórios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: data_ini
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Data inicial (YYYY-MM-DD)
 *       - in: query
 *         name: data_fim
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Data final (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Download do arquivo PDF
 */
router.get('/agenda/pdf', auth, relatorioCtrl.relatorioAgendaPDF);

module.exports = router;
