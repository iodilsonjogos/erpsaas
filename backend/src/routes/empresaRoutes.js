const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const empresaCtrl = require('../controllers/empresaController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * /config/empresa:
 *   get:
 *     summary: Dados da empresa logada
 *     tags: [Empresa]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados da empresa
 */
router.get('/', auth(), empresaCtrl.getEmpresa);

/**
 * @swagger
 * /config/empresa:
 *   put:
 *     summary: Atualiza dados da empresa logada
 *     tags: [Empresa]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Empresa'
 *     responses:
 *       204:
 *         description: Empresa atualizada
 */
router.put('/', auth(['admin']), empresaCtrl.atualizarEmpresa);

router.post('/upload-logo', auth(['admin']), upload.single('logo'), empresaCtrl.uploadLogo);

module.exports = router;
