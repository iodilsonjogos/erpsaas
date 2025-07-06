// /backend/src/routes/agendamentoOnlineRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const acl = require('../middlewares/acl');
const agendamentoOnlineCtrl = require('../controllers/agendamentoOnlineController');

/**
 * @swagger
 * tags:
 *   - name: Agendamento Online
 *     description: Agendamento online feito pelo próprio cliente autenticado
 */

/**
 * @swagger
 * /agendamento-online:
 *   post:
 *     summary: Cliente faz um novo agendamento online
 *     tags: [Agendamento Online]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               profissional_id:
 *                 type: integer
 *                 example: 1
 *               servico_id:
 *                 type: integer
 *                 example: 2
 *               data:
 *                 type: string
 *                 format: date
 *                 example: "2024-07-03"
 *               hora:
 *                 type: string
 *                 example: "10:00"
 *               observacoes:
 *                 type: string
 *                 example: "Quero corte degradê"
 *     responses:
 *       201:
 *         description: Agendamento realizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autenticado ou perfil incorreto
 *       500:
 *         description: Erro no servidor
 */
router.post('/', auth, acl(['cliente']), agendamentoOnlineCtrl.criar);

/**
 * @swagger
 * /agendamento-online/meus:
 *   get:
 *     summary: Lista todos os agendamentos feitos pelo cliente logado
 *     tags: [Agendamento Online]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de agendamentos do cliente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         description: Não autenticado ou perfil incorreto
 *       500:
 *         description: Erro no servidor
 */
router.get('/meus', auth, acl(['cliente']), agendamentoOnlineCtrl.meus);

/**
 * @swagger
 * /agendamento-online/horarios-disponiveis:
 *   get:
 *     summary: Lista horários disponíveis para um profissional em uma data
 *     tags: [Agendamento Online]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: profissional_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do profissional
 *       - in: query
 *         name: data
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Data desejada (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Lista de horários livres (array de strings)
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: "10:00"
 *       400:
 *         description: Parâmetros obrigatórios ausentes
 *       401:
 *         description: Não autenticado ou perfil incorreto
 *       500:
 *         description: Erro no servidor
 */
router.get('/horarios-disponiveis', auth, acl(['cliente']), agendamentoOnlineCtrl.horariosDisponiveis);

module.exports = router;
