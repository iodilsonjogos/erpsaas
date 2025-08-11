const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Listar todos os usuários da empresa
exports.listar = async (req, res) => {
  try {
    const [usuarios] = await db.query(
      'SELECT id, empresa_id, nome, email, perfil, status AS ativo, created_at FROM usuarios WHERE empresa_id=?',
      [req.user.empresa_id]
    );
    res.json(usuarios);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    res.status(500).json({ mensagem: 'Erro ao listar usuários' });
  }
};

// Detalhar usuário por ID
exports.detalhar = async (req, res) => {
  try {
    const { id } = req.params;
    const [usuarios] = await db.query(
      'SELECT id, empresa_id, nome, email, perfil, status AS ativo, created_at FROM usuarios WHERE id=? AND empresa_id=?',
      [id, req.user.empresa_id]
    );
    if (!usuarios.length) return res.status(404).json({ mensagem: "Usuário não encontrado" });
    res.json(usuarios[0]);
  } catch (err) {
    console.error('Erro ao detalhar usuário:', err);
    res.status(500).json({ mensagem: "Erro ao buscar usuário" });
  }
};

// Criar novo usuário (apenas admin pode)
exports.criar = async (req, res) => {
  try {
    const { nome, email, senha, perfil } = req.body;
    const empresa_id = req.user.empresa_id; // Usa empresa do usuário logado

    const [existe] = await db.query('SELECT * FROM usuarios WHERE email=? AND empresa_id=?', [email, empresa_id]);
    if (existe.length) return res.status(400).json({ mensagem: "E-mail já cadastrado" });

    const hashSenha = await bcrypt.hash(senha, 10);
    const status = 'ativo';
    await db.query(
      'INSERT INTO usuarios (nome, email, senha, perfil, empresa_id, status) VALUES (?, ?, ?, ?, ?, ?)',
      [nome, email, hashSenha, perfil, empresa_id, status]
    );
    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).json({ mensagem: "Erro ao cadastrar usuário" });
  }
};

// Atualizar usuário
exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha, perfil, status } = req.body;

    let query = 'UPDATE usuarios SET nome=?, email=?, perfil=?, status=?';
    let params = [nome, email, perfil, status];

    if (senha) {
      query += ', senha=?';
      const hashSenha = await bcrypt.hash(senha, 10);
      params.push(hashSenha);
    }

    query += ' WHERE id=? AND empresa_id=?';
    params.push(id, req.user.empresa_id);

    await db.query(query, params);
    res.json({ mensagem: "Usuário atualizado com sucesso!" });
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err);
    res.status(500).json({ mensagem: "Erro ao atualizar usuário" });
  }
};

// Deletar usuário (da empresa)
exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM usuarios WHERE id=? AND empresa_id=?', [id, req.user.empresa_id]);
    res.json({ mensagem: "Usuário excluído com sucesso!" });
  } catch (err) {
    console.error('Erro ao excluir usuário:', err);
    res.status(500).json({ mensagem: "Erro ao excluir usuário" });
  }
};

// Login (checa assinatura/trial)
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const [usuarios] = await db.query(
      "SELECT * FROM usuarios WHERE email=? AND status='ativo'",
      [email]
    );
    if (!usuarios.length) return res.status(401).json({ mensagem: "Usuário não encontrado" });

    const usuario = usuarios[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) return res.status(401).json({ mensagem: "Senha inválida" });

    // Checa assinatura/trial
    const [assinaturaRows] = await db.query(
      'SELECT * FROM assinaturas WHERE empresa_id=? AND status="ativo" ORDER BY data_fim DESC LIMIT 1',
      [usuario.empresa_id]
    );
    const assinatura = assinaturaRows[0];
    const hoje = new Date().toISOString().slice(0, 10);
    if (!assinatura || assinatura.data_fim < hoje) {
      return res.status(403).json({ mensagem: "Seu período de avaliação expirou. Contrate um plano para continuar." });
    }

    // Login normal
    const token = jwt.sign(
      {
        id: usuario.id,
        empresa_id: usuario.empresa_id,
        perfil: usuario.perfil,
      },
      process.env.JWT_SECRET,
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
  } catch (err) {
    console.error('Erro ao logar usuário:', err);
    res.status(500).json({ mensagem: "Erro ao autenticar usuário" });
  }
};

// Registro público (cria empresa, usuário admin, trial 5 dias)
exports.registrarPublico = async (req, res) => {
  try {
    const {
      nome,
      email,
      senha,
      tipo,        // 'pj' ou 'pf'
      cnpj,
      cpf,
      telefone,
      segmento,
      empresa      // nome do negócio/empresa
    } = req.body;

    // Validação básica
    if (!nome || !email || !senha || !empresa) {
      return res.status(400).json({ mensagem: "Campos obrigatórios faltando." });
    }

    // Checagem de duplicidade
    const [existeUser] = await db.query('SELECT * FROM usuarios WHERE email=?', [email]);
    if (existeUser.length) return res.status(400).json({ mensagem: "E-mail já cadastrado" });

    if (tipo === "pj" && cnpj) {
      const [existeEmpresa] = await db.query('SELECT * FROM empresas WHERE cnpj=?', [cnpj]);
      if (existeEmpresa.length) return res.status(400).json({ mensagem: "CNPJ já cadastrado" });
    }
    if (tipo === "pf" && cpf) {
      const [existeEmpresa] = await db.query('SELECT * FROM empresas WHERE cnpj=?', [cpf]);
      if (existeEmpresa.length) return res.status(400).json({ mensagem: "CPF já cadastrado" });
    }

    // Criação da empresa
    const [empresaResult] = await db.query(
      'INSERT INTO empresas (nome, cnpj, email, telefone, plano_id, status) VALUES (?, ?, ?, ?, ?, ?)',
      [empresa, tipo === 'pj' ? cnpj : cpf, email, telefone, 1, 'ativo']
    );
    const empresa_id = empresaResult.insertId;

    // Criação do trial (assinatura Free, 5 dias)
    const hoje = new Date();
    const data_inicio = hoje.toISOString().slice(0, 10);
    const data_fim = new Date(hoje.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    await db.query(
      'INSERT INTO assinaturas (empresa_id, plano_id, data_inicio, data_fim, status) VALUES (?, ?, ?, ?, ?)',
      [empresa_id, 1, data_inicio, data_fim, 'ativo']
    );

    // Criação do usuário admin
    const hashSenha = await bcrypt.hash(senha, 10);
    await db.query(
      'INSERT INTO usuarios (nome, email, senha, perfil, empresa_id, status) VALUES (?, ?, ?, ?, ?, ?)',
      [nome, email, hashSenha, 'admin', empresa_id, 'ativo']
    );

    // Buscar usuário recém-criado
    const [usuarios] = await db.query('SELECT * FROM usuarios WHERE email=?', [email]);
    const usuario = usuarios[0];

    // Checar assinatura (para login automático)
    const [assinaturaRows] = await db.query(
      'SELECT * FROM assinaturas WHERE empresa_id=? AND status="ativo" ORDER BY data_fim DESC LIMIT 1',
      [empresa_id]
    );
    const assinatura = assinaturaRows[0];

    // Token JWT
    const token = jwt.sign(
      { id: usuario.id, empresa_id: usuario.empresa_id, perfil: usuario.perfil },
      process.env.JWT_SECRET, { expiresIn: '12h' }
    );

    res.status(201).json({
      mensagem: "Bem-vindo(a)! Empresa cadastrada e trial de 5 dias liberado.",
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
        empresa_id: usuario.empresa_id
      },
      assinatura
    });

  } catch (err) {
    console.error('Erro ao registrar empresa/usuário:', err);
    res.status(500).json({ mensagem: "Erro ao registrar empresa/usuário." });
  }
};

// Recuperação de senha (envio de link por e-mail)
exports.recuperarSenha = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "E-mail é obrigatório" });

  try {
    const [usuarios] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    if (usuarios.length === 0) {
      // Sempre responde sucesso para evitar exposição de usuários existentes
      return res.json({ message: "Se o e-mail estiver cadastrado, você receberá instruções para redefinir sua senha." });
    }

    // Gere token simples para dev (troque para token real em produção)
    const token = Math.random().toString(36).substr(2, 8);
    await db.query("UPDATE usuarios SET reset_token = ?, reset_token_expira = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE email = ?", [token, email]);
    console.log(`
      Enviar e-mail para: ${email}
      Link de redefinição: http://localhost:3000/resetar-senha/${token}
    `);
    return res.json({ message: "Se o e-mail estiver cadastrado, você receberá instruções para redefinir sua senha." });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao processar solicitação." });
  }
};

// Redefinir senha com token
exports.resetarSenha = async (req, res) => {
  const { token } = req.params;
  const { novaSenha } = req.body;

  if (!novaSenha) {
    return res.status(400).json({ error: "Nova senha é obrigatória." });
  }

  try {
    const [usuarios] = await db.query(
      "SELECT * FROM usuarios WHERE reset_token = ? AND reset_token_expira > NOW()",
      [token]
    );
    if (usuarios.length === 0) {
      return res.status(400).json({ error: "Token inválido ou expirado." });
    }

    const usuario = usuarios[0];
    const hashSenha = await bcrypt.hash(novaSenha, 10);

    await db.query(
      "UPDATE usuarios SET senha = ?, reset_token = NULL, reset_token_expira = NULL WHERE id = ?",
      [hashSenha, usuario.id]
    );

    res.json({ message: "Senha redefinida com sucesso. Faça login com a nova senha." });
  } catch (error) {
    res.status(500).json({ error: "Erro ao redefinir senha." });
  }
};
