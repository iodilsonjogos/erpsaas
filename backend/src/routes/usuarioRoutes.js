const express = require('express');
const router = express.Router();
const usuarioCtrl = require('../controllers/usuarioController');
const auth = require('../middlewares/auth');
const acl = require('../middlewares/acl');
/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints de Usuários
 */
// Login de usuário (padrão ERP SaaS)
/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *               senha: { type: string }
 *     responses:
 *       200:
 *         description: Login efetuado com sucesso e token retornado
 */
router.post('/login', usuarioCtrl.login);

// Registro público – NOVA EMPRESA E USUÁRIO ADMIN (trial 5 dias)
/**
 * @swagger
 * /usuarios/register:
 *   post:
 *     summary: Registro público (criação de empresa e admin trial)
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome: { type: string }
 *               email: { type: string }
 *               senha: { type: string }
 *               tipo: { type: string }
 *               cnpj: { type: string }
 *               cpf: { type: string }
 *               telefone: { type: string }
 *               segmento: { type: string }
 *               empresa: { type: string }
 *     responses:
 *       201:
 *         description: Empresa e usuário admin criados com sucesso
 */
router.post('/register', usuarioCtrl.registrarPublico);

/**
 * @swagger
 * /usuarios/recuperar-senha:
 *   post:
 *     summary: Recuperação de senha
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string }
 *     responses:
 *       200:
 *         description: Se o e-mail existir, link de redefinição enviado
 */
router.post('/recuperar-senha', usuarioCtrl.recuperarSenha);
// Redefinir senha (pública)
/**
 * @swagger
 * /usuarios/resetar-senha/{token}:
 *   post:
 *     summary: Redefinir senha com token
 *     tags: [Usuários]
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               novaSenha: { type: string }
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 */
router.post('/resetar-senha/:token', usuarioCtrl.resetarSenha);

// Rotas protegidas (apenas admin logado)
/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Criar usuário (apenas admin autenticado)
 *     tags: [Usuários]
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
 *               email: { type: string }
 *               senha: { type: string }
 *               perfil: { type: string }
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post('/', auth, acl(['admin']), usuarioCtrl.criar);

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Listar todos os usuários da empresa
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários retornada
 */
router.get('/', auth, acl(['admin']), usuarioCtrl.listar);

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Detalhar usuário por ID
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário detalhado
 */
router.get('/:id', auth, acl(['admin']), usuarioCtrl.detalhar);
/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Atualizar usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome: { type: string }
 *               email: { type: string }
 *               senha: { type: string }
 *               perfil: { type: string }
 *               status: { type: string }
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 */
router.put('/:id', auth, acl(['admin']), usuarioCtrl.atualizar);
/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Deletar usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 */
router.delete('/:id', auth, acl(['admin']), usuarioCtrl.deletar);

module.exports = router;