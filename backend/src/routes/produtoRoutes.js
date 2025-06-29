const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const produtoCtrl = require('../controllers/produtoController');

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista produtos
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
router.get('/', auth(), produtoCtrl.listar);

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria produto
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Produto'
 *     responses:
 *       201:
 *         description: Produto criado
 */
router.post('/', auth(['admin', 'operador']), produtoCtrl.criar);
router.put('/:id', auth(['admin', 'operador']), produtoCtrl.atualizar);
router.delete('/:id', auth(['admin']), produtoCtrl.remover);

module.exports = router;
