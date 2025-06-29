const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const financeiroCtrl = require('../controllers/financeiroController');

/**
 * @swagger
 * /financeiro:
 *   get:
 *     summary: Lista lançamentos financeiros
 *     tags: [Financeiro]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de lançamentos financeiros
 */
router.get('/', auth(), financeiroCtrl.listar);

/**
 * @swagger
 * /financeiro:
 *   post:
 *     summary: Cria lançamento financeiro
 *     tags: [Financeiro]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LancamentoFinanceiro'
 *     responses:
 *       201:
 *         description: Lançamento criado
 */
router.post('/', auth(['admin', 'operador']), financeiroCtrl.criar);
router.put('/:id', auth(['admin', 'operador']), financeiroCtrl.atualizar);
router.delete('/:id', auth(['admin']), financeiroCtrl.remover);

module.exports = router;
