const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const relatorioCtrl = require('../controllers/relatorioController');

/**
 * @swagger
 * /relatorios/vendas:
 *   get:
 *     summary: Relatório de vendas (JSON)
 *     tags: [Relatórios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: inicio
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: fim
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Relatório de vendas
 */
router.get('/vendas', auth(), relatorioCtrl.relatorioVendas);
// ...demais rotas de Excel/PDF iguais, se desejar

module.exports = router;

// Exportação Excel
router.get('/vendas/excel', auth(), relatorioCtrl.relatorioVendasExcel);
// Exportação PDF
router.get('/vendas/pdf', auth(), relatorioCtrl.relatorioVendasPDF);

router.get('/financeiro', auth(), relatorioCtrl.relatorioFinanceiro);
router.get('/financeiro/excel', auth(), relatorioCtrl.relatorioFinanceiroExcel);
router.get('/financeiro/pdf', auth(), relatorioCtrl.relatorioFinanceiroPDF);

router.get('/produtos', auth(), relatorioCtrl.relatorioProdutos);
router.get('/produtos/excel', auth(), relatorioCtrl.relatorioProdutosExcel);
router.get('/produtos/pdf', auth(), relatorioCtrl.relatorioProdutosPDF);

router.get('/agenda', auth(), relatorioCtrl.relatorioAgenda);
router.get('/agenda/excel', auth(), relatorioCtrl.relatorioAgendaExcel);
router.get('/agenda/pdf', auth(), relatorioCtrl.relatorioAgendaPDF);

module.exports = router;
