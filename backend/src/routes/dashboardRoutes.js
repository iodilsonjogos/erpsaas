const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const dashboardCtrl = require('../controllers/dashboardController');

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Dados do dashboard
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna indicadores do dashboard
 */
router.get('/', auth(['admin']), dashboardCtrl.resumo);
router.get('/vendas-mes', auth(['admin']), dashboardCtrl.vendasPorMes);
router.get('/produtos-top', auth(['admin']), dashboardCtrl.produtosMaisVendidos);

module.exports = router;
