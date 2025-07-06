// /backend/src/routes/profissionalRoutes.js

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const acl = require('../middlewares/acl');
const profissionalCtrl = require('../controllers/profissionalController');

/**
 * @swagger
 * /profissionais:
 *   get:
 *     summary: Lista todos os profissionais
 *     tags: [Profissionais]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de profissionais
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profissional'
 */
router.get('/', auth, acl(['admin', 'operador']), profissionalCtrl.listar);

/**
 * @swagger
 * /profissionais/{id}:
 *   get:
 *     summary: Detalha um profissional pelo ID
 *     tags: [Profissionais]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do profissional
 *     responses:
 *       200:
 *         description: Dados do profissional
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profissional'
 *       401:
 *         description: Não autenticado
 *       403:
 *         description: Permissão insuficiente
 *       404:
 *         description: Profissional não encontrado
 */
router.get('/:id', auth, acl(['admin', 'operador']), profissionalCtrl.detalhar);

/**
 * @swagger
 * /profissionais:
 *   post:
 *     summary: Cria um novo profissional
 *     tags: [Profissionais]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profissional'
 *     responses:
 *       201:
 *         description: Profissional criado com sucesso
 */
router.post('/', auth, acl(['admin']), profissionalCtrl.criar);

/**
 * @swagger
 * /profissionais/{id}:
 *   put:
 *     summary: Atualiza um profissional existente
 *     tags: [Profissionais]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do profissional
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profissional'
 *     responses:
 *       200:
 *         description: Profissional atualizado com sucesso
 */
router.put('/:id', auth, acl(['admin']), profissionalCtrl.atualizar);

/**
 * @swagger
 * /profissionais/{id}:
 *   delete:
 *     summary: Exclui um profissional
 *     tags: [Profissionais]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do profissional
 *     responses:
 *       200:
 *         description: Profissional excluído com sucesso
 */
router.delete('/:id', auth, acl(['admin']), profissionalCtrl.deletar);

module.exports = router;
