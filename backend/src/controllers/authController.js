const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { nome, email, senha, tipo, cnpj, cpf, empresa, telefone, segmento } = req.body;
    if (!email || !senha || !nome || !tipo) {
      return res.status(400).json({ mensagem: "Campos obrigatórios não informados" });
    }

    // Checa email duplicado
    const [exist] = await db.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (exist.length > 0) return res.status(409).json({ mensagem: "E-mail já cadastrado" });

    // Criptografa senha
    const hash = await bcrypt.hash(senha, 10);

    // Cria empresa se for PJ, ou pega o nome do negócio se for PF
    let empresaId = null;
    if (tipo === 'pj') {
      const [emp] = await db.query(
        'INSERT INTO empresas (nome, cnpj, email, telefone, plano_id) VALUES (?, ?, ?, ?, 1)', // plano_id = 1 (Free)
        [empresa || nome, cnpj, email, telefone]
      );
      empresaId = emp.insertId;
    } else {
      const [emp] = await db.query(
        'INSERT INTO empresas (nome, email, telefone, plano_id) VALUES (?, ?, ?, 1)',
        [empresa || nome, email, telefone]
      );
      empresaId = emp.insertId;
    }

    // Cadastra usuário como admin da empresa
    await db.query(
      'INSERT INTO usuarios (nome, email, senha, perfil, empresa_id, status) VALUES (?, ?, ?, ?, ?, ?)',
      [nome, email, hash, 'admin', empresaId, 'ativo']
    );

    // Gera token de login já autenticado
    const [user] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    const token = jwt.sign(
      { id: user[0].id, empresa_id: empresaId, perfil: 'admin' },
      process.env.JWT_SECRET || 'sua-chave-secreta',
      { expiresIn: '12h' }
    );
    res.json({ token, usuario: { id: user[0].id, nome, email, perfil: 'admin', empresa_id: empresaId } });

  } catch (e) {
    res.status(500).json({ mensagem: "Erro ao registrar usuário", erro: e.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (rows.length === 0) return res.status(401).json({ mensagem: "E-mail ou senha inválidos" });

    const usuario = rows[0];
    const senhaOk = await bcrypt.compare(senha, usuario.senha);
    if (!senhaOk) return res.status(401).json({ mensagem: "E-mail ou senha inválidos" });

    const token = jwt.sign(
      { id: usuario.id, empresa_id: usuario.empresa_id, perfil: usuario.perfil },
      process.env.JWT_SECRET || 'sua-chave-secreta',
      { expiresIn: '12h' }
    );
    res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
        empresa_id: usuario.empresa_id
      }
    });
  } catch (e) {
    res.status(500).json({ mensagem: "Erro ao fazer login", erro: e.message });
  }
};
