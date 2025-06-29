const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const usuarioCtrl = require('../controllers/usuarioController');

/**
 * @swagger
 * /usuarios/perfil:
 *   get:
 *     summary: Consulta perfil do usuário logado
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil do usuário logado
 */
router.get('/perfil', auth(), usuarioCtrl.getPerfil);

/**
 * @swagger
 * /usuarios/perfil:
 *   put:
 *     summary: Atualiza perfil do usuário logado
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       204:
 *         description: Usuário atualizado
 */
router.put('/perfil', auth(), usuarioCtrl.atualizarPerfil);

module.exports = router;
