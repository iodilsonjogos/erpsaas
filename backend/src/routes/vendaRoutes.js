const express = require('express');
const router = express.Router();
const vendaCtrl = require('../controllers/vendaController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     VendaItem:
 *       type: object
 *       properties:
 *         produto_id: { type: integer }
 *         quantidade: { type: integer }
 *         preco_unitario: { type: number }
 *         subtotal: { type: number }
 *     Venda:
 *       type: object
 *       properties:
 *         id: { type: integer }
 *         empresa_id: { type: integer }
 *         cliente_id: { type: integer }
 *         data: { type: string, format: date }
 *         total: { type: number }
 *         observacoes: { type: string }
 *         itens:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/VendaItem'
 *         created_at: { type: string, format: date-time }
 */

/**
 * @swagger
 * /vendas:
 *   get:
 *     summary: Lista todas as vendas
 *     tags: [Vendas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vendas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venda'
 */
router.get('/', auth, vendaCtrl.listar);

/**
 * @swagger
 * /vendas:
 *   post:
 *     summary: Cria uma nova venda (com itens)
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
 *         description: Venda criada com sucesso
 */
router.post('/', auth, vendaCtrl.criar);

/**
 * @swagger
 * /vendas/{id}:
 *   put:
 *     summary: Atualiza uma venda (apenas dados principais)
 *     tags: [Vendas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da venda
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Venda'
 *     responses:
 *       200:
 *         description: Venda atualizada com sucesso
 */
router.put('/:id', auth, vendaCtrl.atualizar);

/**
 * @swagger
 * /vendas/{id}:
 *   delete:
 *     summary: Exclui uma venda (e seus itens)
 *     tags: [Vendas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da venda
 *     responses:
 *       200:
 *         description: Venda excluída com sucesso
 */
router.delete('/:id', auth, vendaCtrl.deletar);

module.exports = router;
