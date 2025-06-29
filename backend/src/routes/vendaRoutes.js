const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const vendaCtrl = require('../controllers/vendaController');

/**
 * @swagger
 * /vendas:
 *   get:
 *     summary: Lista vendas
 *     tags: [Vendas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vendas
 */
router.get('/', auth(), vendaCtrl.listar);

/**
 * @swagger
 * /vendas:
 *   post:
 *     summary: Cria venda
 *     tags: [Vendas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Venda'
 *     responses:
 *       201:
 *         description: Venda criada
 */
router.post('/', auth(['admin', 'operador']), vendaCtrl.criar);
router.put('/:id', auth(['admin', 'operador']), vendaCtrl.atualizar);
router.delete('/:id', auth(['admin']), vendaCtrl.remover);

module.exports = router;
