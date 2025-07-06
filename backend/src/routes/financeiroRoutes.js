const express = require('express');
const router = express.Router();
const financeiroCtrl = require('../controllers/financeiroController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Financeiro:
 *       type: object
 *       properties:
 *         id: { type: integer }
 *         empresa_id: { type: integer }
 *         tipo: { type: string, enum: [receita, despesa] }
 *         categoria: { type: string }
 *         descricao: { type: string }
 *         valor: { type: number }
 *         data: { type: string, format: date }
 *         observacoes: { type: string }
 *         created_at: { type: string, format: date-time }
 */

/**
 * @swagger
 * /financeiro:
 *   get:
 *     summary: Lista todos os lançamentos financeiros
 *     tags: [Financeiro]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de lançamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Financeiro'
 */
router.get('/', auth, financeiroCtrl.listar);

/**
 * @swagger
 * /financeiro:
 *   post:
 *     summary: Cria um novo lançamento financeiro
 *     tags: [Financeiro]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Financeiro'
 *     responses:
 *       201:
 *         description: Lançamento cadastrado com sucesso
 */
router.post('/', auth, financeiroCtrl.criar);

/**
 * @swagger
 * /financeiro/{id}:
 *   put:
 *     summary: Atualiza um lançamento financeiro
 *     tags: [Financeiro]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do lançamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Financeiro'
 *     responses:
 *       200:
 *         description: Lançamento atualizado com sucesso
 */
router.put('/:id', auth, financeiroCtrl.atualizar);

/**
 * @swagger
 * /financeiro/{id}:
 *   delete:
 *     summary: Exclui um lançamento financeiro
 *     tags: [Financeiro]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do lançamento
 *     responses:
 *       200:
 *         description: Lançamento excluído com sucesso
 */
router.delete('/:id', auth, financeiroCtrl.deletar);

module.exports = router;
