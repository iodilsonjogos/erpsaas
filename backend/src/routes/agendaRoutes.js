const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const agendaCtrl = require('../controllers/agendaController');

/**
 * @swagger
 * /agenda:
 *   get:
 *     summary: Lista agendamentos
 *     tags: [Agenda]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de agendamentos
 */
router.get('/', auth(), agendaCtrl.listar);

/**
 * @swagger
 * /agenda:
 *   post:
 *     summary: Cria agendamento
 *     tags: [Agenda]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agendamento'
 *     responses:
 *       201:
 *         description: Agendamento criado
 */
router.post('/', auth(['admin', 'operador']), agendaCtrl.criar);
router.put('/:id', auth(['admin', 'operador']), agendaCtrl.atualizar);
router.delete('/:id', auth(['admin']), agendaCtrl.remover);

module.exports = router;
