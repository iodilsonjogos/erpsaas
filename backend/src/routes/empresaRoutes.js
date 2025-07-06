const express = require('express');
const router = express.Router();
const empresaCtrl = require('../controllers/empresaController');
const auth = require('../middlewares/auth');
const acl = require('../middlewares/acl');


/**
 * @swagger
 * tags:
 *   - name: Empresa
 *     description: Configurações da empresa (multiempresa)
 */

/**
 * @swagger
 * /config/empresa:
 *   get:
 *     summary: Buscar configurações da empresa logada
 *     tags: [Empresa]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados de configuração da empresa
 */
router.get('/', auth, acl(['admin']), empresaCtrl.get);

/**
 * @swagger
 * /config/empresa:
 *   put:
 *     summary: Atualizar configurações da empresa logada
 *     tags: [Empresa]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome: { type: string }
 *               cnpj: { type: string }
 *               email: { type: string }
 *               telefone: { type: string }
 *               endereco: { type: string }
 *               confirmacao_agendamento: { type: string, enum: [manual, automatica] }
 *               permite_upsell: { type: integer, enum: [0, 1] }
 *               confirmacao_baixa: { type: string, enum: [profissional, recepcao, ambos] }
 *               tipo_comissao: { type: string, enum: [fixa, percentual] }
 *               valor_comissao: { type: number }
 *     responses:
 *       200:
 *         description: Empresa atualizada com sucesso
 */
router.put('/', auth, acl(['admin']), empresaCtrl.update);

/**
 * @swagger
 * /config/empresa/upload-logo:
 *   post:
 *     summary: Upload do logo da empresa
 *     tags: [Empresa]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               logo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Logo atualizada com sucesso
 */
router.post('/upload-logo', auth, empresaCtrl.uploadLogo);

module.exports = router;
