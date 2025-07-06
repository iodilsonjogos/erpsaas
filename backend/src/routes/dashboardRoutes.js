const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const acl = require('../middlewares/acl');
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
router.get('/', auth, acl(['admin']), dashboardCtrl.resumo);
router.get('/vendas-mes', auth, acl(['admin']), dashboardCtrl.vendasPorMes);
router.get('/produtos-top', auth, acl(['admin']), dashboardCtrl.produtosMaisVendidos);

module.exports = router;
