const express = require('express');
const router = express.Router();
const agendaCtrl = require('../controllers/agendaController');
const auth = require('../middlewares/auth');

/**
 * @swagger
 * components:
 *   schemas:
 *     Agenda:
 *       type: object
 *       properties:
 *         id: { type: integer }
 *         empresa_id: { type: integer }
 *         cliente_id: { type: integer }
 *         profissional_id: { type: integer }
 *         servico_id: { type: integer }
 *         data: { type: string, format: date }
 *         hora: { type: string, format: time }
 *         status: { type: string }
 *         observacoes: { type: string }
 *         created_at: { type: string, format: date-time }
 */

/**
 * @swagger
 * /agenda:
 *   get:
 *     summary: Lista todos os agendamentos
 *     tags: [Agenda]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de agendamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agenda'
 */
router.get('/', auth, agendaCtrl.listar);

/**
 * @swagger
 * /agenda:
 *   post:
 *     summary: Cria um novo agendamento
 *     tags: [Agenda]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agenda'
 *     responses:
 *       201:
 *         description: Agendamento criado com sucesso
 */
router.post('/', auth, agendaCtrl.criar);

/**
 * @swagger
 * /agenda/{id}:
 *   put:
 *     summary: Atualiza um agendamento existente
 *     tags: [Agenda]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do agendamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agenda'
 *     responses:
 *       200:
 *         description: Agendamento atualizado com sucesso
 */
router.put('/:id', auth, agendaCtrl.atualizar);

/**
 * @swagger
 * /agenda/{id}:
 *   delete:
 *     summary: Exclui um agendamento
 *     tags: [Agenda]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do agendamento
 *     responses:
 *       200:
 *         description: Agendamento excluído com sucesso
 */
router.delete('/:id', auth, agendaCtrl.deletar);

module.exports = router;
