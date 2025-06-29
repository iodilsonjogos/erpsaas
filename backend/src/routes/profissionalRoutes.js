const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const profissionalCtrl = require('../controllers/profissionalController');

/**
 * @swagger
 * /profissionais:
 *   get:
 *     summary: Lista profissionais
 *     tags: [Profissionais]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de profissionais
 */
router.get('/', auth(), profissionalCtrl.listar);

/**
 * @swagger
 * /profissionais:
 *   post:
 *     summary: Cria profissional
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
 *         description: Profissional criado
 */
router.post('/', auth(['admin', 'operador']), profissionalCtrl.criar);
router.put('/:id', auth(['admin', 'operador']), profissionalCtrl.atualizar);
router.delete('/:id', auth(['admin']), profissionalCtrl.remover);

module.exports = router;
