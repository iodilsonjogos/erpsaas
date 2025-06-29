const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const servicoCtrl = require('../controllers/servicoController');

/**
 * @swagger
 * /servicos:
 *   get:
 *     summary: Lista serviços
 *     tags: [Serviços]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de serviços
 */
router.get('/', auth(), servicoCtrl.listar);

/**
 * @swagger
 * /servicos:
 *   post:
 *     summary: Cria serviço
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
 *         description: Serviço criado
 */
router.post('/', auth(['admin', 'operador']), servicoCtrl.criar);
router.put('/:id', auth(['admin', 'operador']), servicoCtrl.atualizar);
router.delete('/:id', auth(['admin']), servicoCtrl.remover);

module.exports = router;
