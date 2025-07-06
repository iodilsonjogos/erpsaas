const express = require('express');
const router = express.Router();
const servicoCtrl = require('../controllers/servicoController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Servico:
 *       type: object
 *       properties:
 *         id: { type: integer }
 *         empresa_id: { type: integer }
 *         nome: { type: string }
 *         descricao: { type: string }
 *         preco: { type: number }
 *         ativo: { type: integer }
 *         created_at: { type: string, format: date-time }
 */

/**
 * @swagger
 * /servicos:
 *   get:
 *     summary: Lista todos os serviços
 *     tags: [Serviços]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de serviços
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Servico'
 */
router.get('/', auth, servicoCtrl.listar);

/**
 * @swagger
 * /servicos:
 *   post:
 *     summary: Cria um novo serviço
 *     tags: [Serviços]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Servico'
 *     responses:
 *       201:
 *         description: Serviço criado com sucesso
 */
router.post('/', auth, servicoCtrl.criar);

/**
 * @swagger
 * /servicos/{id}:
 *   put:
 *     summary: Atualiza um serviço existente
 *     tags: [Serviços]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do serviço
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Servico'
 *     responses:
 *       200:
 *         description: Serviço atualizado com sucesso
 */
router.put('/:id', auth, servicoCtrl.atualizar);

/**
 * @swagger
 * /servicos/{id}:
 *   delete:
 *     summary: Exclui um serviço
 *     tags: [Serviços]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do serviço
 *     responses:
 *       200:
 *         description: Serviço excluído com sucesso
 */
router.delete('/:id', auth, servicoCtrl.deletar);

module.exports = router;
