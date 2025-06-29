const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const clienteCtrl = require('../controllers/clienteController');

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Lista clientes
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
router.get('/', auth(), clienteCtrl.listar);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Cria cliente
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       201:
 *         description: Cliente criado
 */
router.post('/', auth(['admin', 'operador']), clienteCtrl.criar);
router.put('/:id', auth(['admin', 'operador']), clienteCtrl.atualizar);
router.delete('/:id', auth(['admin']), clienteCtrl.remover);

module.exports = router;
