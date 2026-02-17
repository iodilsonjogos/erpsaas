const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =====================
// Helpers
// =====================
function getJwtSecret() {
  const s = process.env.JWT_SECRET;
  return s && String(s).trim() ? String(s).trim() : null;
}

async function withTransaction(fn) {
  // Suporta pool mysql2 (getConnection) ou fallback sem transaction
  if (typeof db.getConnection !== "function") {
    return fn(db);
  }
  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    const result = await fn(conn);
    await conn.commit();
    return result;
  } catch (e) {
    try {
      await conn.rollback();
    } catch (_) {}
    throw e;
  } finally {
    try {
      conn.release();
    } catch (_) {}
  }
}

// =====================
// PUBLIC: Registro público (empresa + admin + trial)
// =====================
exports.registrarPublico = async (req, res) => {
  try {
    const {
      // empresa
      empresa_nome,
      empresa_documento, // CPF ou CNPJ (vai no campo empresas.cnpj)
      empresa_email,
      empresa_telefone,
      empresa_endereco,
      segmento, // opcional (não existe no schema atual)
      // admin
      admin_nome,
      admin_email,
      admin_senha,
    } = req.body;

    if (!empresa_nome || !admin_nome || !admin_email || !admin_senha) {
      return res.status(400).json({
        mensagem:
          "Campos obrigatórios: empresa_nome, admin_nome, admin_email, admin_senha.",
      });
    }

    const jwtSecret = getJwtSecret();
    if (!jwtSecret) {
      return res.status(500).json({
        mensagem:
          "Configuração inválida: JWT_SECRET ausente no backend (.env).",
      });
    }

    // Regras: não permitir novo cadastro com mesmo CPF/CNPJ e e-mail depois do bloqueio
    // Como seu schema não tem CPF, usamos empresas.cnpj para CPF/CNPJ (documento)
    const documento = empresa_documento
      ? String(empresa_documento).trim()
      : null;
    const emailEmpresa = empresa_email ? String(empresa_email).trim() : null;

    // Se já existe empresa com mesmo documento OU email e estiver bloqueada/inativa => impedir
    // (status padrão do schema é 'ativo', mas você pode usar 'bloqueado'/'inativo' no futuro)
    if (documento || emailEmpresa) {
      const [empExist] = await db.query(
        `SELECT id, status, cnpj, email
           FROM empresas
          WHERE (${documento ? "cnpj=?" : "1=0"})
             OR (${emailEmpresa ? "email=?" : "1=0"})
          LIMIT 1`,
        [
          ...(documento ? [documento] : []),
          ...(emailEmpresa ? [emailEmpresa] : []),
        ],
      );

      if (empExist.length) {
        const e = empExist[0];
        // Se estiver bloqueada/inativa, não permite recadastro
        if (String(e.status || "").toLowerCase() !== "ativo") {
          return res.status(403).json({
            mensagem:
              "Esta empresa está bloqueada/inativa. Não é permitido novo cadastro com este documento/e-mail.",
          });
        }
      }
    }

    // Admin email não pode existir já (global)
    const [userExist] = await db.query(
      "SELECT id, status FROM usuarios WHERE email=? LIMIT 1",
      [String(admin_email).trim()],
    );
    if (userExist.length) {
      // Se você quiser bloquear recadastro quando status != ativo, mantém assim:
      return res
        .status(400)
        .json({ mensagem: "E-mail de admin já cadastrado." });
    }

    const senhaHash = await bcrypt.hash(String(admin_senha), 10);

    const result = await withTransaction(async (conn) => {
      // 1) cria empresa
      const [insEmp] = await conn.query(
        `INSERT INTO empresas
         (nome, cnpj, email, telefone, endereco, plano_id, status)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          String(empresa_nome).trim(),
          documento,
          emailEmpresa,
          empresa_telefone ? String(empresa_telefone).trim() : null,
          empresa_endereco ? String(empresa_endereco).trim() : null,
          1, // plano_id default (ajuste se seu plano trial não for 1)
          "ativo",
        ],
      );

      const empresaId = insEmp.insertId;

      // 2) cria assinatura trial 5 dias corridos
      await conn.query(
        `INSERT INTO assinaturas (empresa_id, plano_id, data_inicio, data_fim, status)
         VALUES (?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 5 DAY), 'ativo')`,
        [empresaId, 1],
      );

      // 3) cria usuário admin
      const [insUser] = await conn.query(
        `INSERT INTO usuarios (nome, email, senha, empresa_id, perfil, status, created_at)
         VALUES (?, ?, ?, ?, 'admin', 'ativo', NOW())`,
        [
          String(admin_nome).trim(),
          String(admin_email).trim(),
          senhaHash,
          empresaId,
        ],
      );

      const userId = insUser.insertId;

      // 4) gera token
      const token = jwt.sign(
        { id: userId, empresa_id: empresaId, perfil: "admin" },
        jwtSecret,
        { expiresIn: "12h" },
      );

      return { token, empresaId, userId };
    });

    return res.status(201).json({
      mensagem: "Empresa criada com sucesso. Bem-vindo!",
      token: result.token,
      usuario: {
        id: result.userId,
        nome: String(admin_nome).trim(),
        email: String(admin_email).trim(),
        perfil: "admin",
        empresa_id: result.empresaId,
      },
    });
  } catch (err) {
    console.error("Erro no registro público:", err);
    return res.status(500).json({ mensagem: "Erro ao registrar empresa." });
  }
};

// =====================
// Login
// =====================
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const jwtSecret = getJwtSecret();
    if (!jwtSecret) {
      return res.status(500).json({
        mensagem:
          "Configuração inválida: JWT_SECRET ausente no backend (.env).",
      });
    }

    const [usuarios] = await db.query(
      "SELECT * FROM usuarios WHERE email=? AND status='ativo' LIMIT 1",
      [String(email).trim()],
    );

    if (!usuarios.length)
      return res.status(401).json({ mensagem: "Usuário não encontrado" });

    const usuario = usuarios[0];

    const ok = await bcrypt.compare(String(senha), usuario.senha);
    if (!ok) return res.status(401).json({ mensagem: "Senha inválida" });

    // valida assinatura ativa e dentro do período
    const [assinaturas] = await db.query(
      `SELECT * FROM assinaturas
        WHERE empresa_id=? AND status='ativo'
        ORDER BY data_fim DESC LIMIT 1`,
      [usuario.empresa_id],
    );

    if (!assinaturas.length) {
      return res.status(403).json({
        mensagem:
          "Seu período de avaliação expirou. Contrate um plano para continuar.",
      });
    }

    const fim = new Date(assinaturas[0].data_fim);
    if (Number.isNaN(fim.getTime()) || fim < new Date()) {
      return res.status(403).json({
        mensagem:
          "Seu período de avaliação expirou. Contrate um plano para continuar.",
      });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        empresa_id: usuario.empresa_id,
        perfil: usuario.perfil,
      },
      jwtSecret,
      { expiresIn: "12h" },
    );

    res.json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
        empresa_id: usuario.empresa_id,
      },
    });
  } catch (err) {
    console.error("Erro ao autenticar usuário:", err);
    res.status(500).json({ mensagem: "Erro ao autenticar usuário" });
  }
};

// =====================
// Recuperar/Resetar Senha
// =====================
exports.recuperarSenha = async (req, res) => {
  try {
    const { email } = req.body;

    const jwtSecret = getJwtSecret();
    if (!jwtSecret) {
      return res.status(500).json({
        mensagem:
          "Configuração inválida: JWT_SECRET ausente no backend (.env).",
      });
    }

    const [usuarios] = await db.query("SELECT id FROM usuarios WHERE email=?", [
      String(email).trim(),
    ]);

    if (!usuarios.length) {
      // resposta neutra (não revela se existe)
      return res.json({
        message: "Se o e-mail existir, enviaremos instruções.",
      });
    }

    const usuario = usuarios[0];
    const token = jwt.sign({ id: usuario.id }, jwtSecret, { expiresIn: "30m" });

    await db.query(
      "UPDATE usuarios SET reset_token=?, reset_token_expira=DATE_ADD(NOW(), INTERVAL 30 MINUTE) WHERE id=?",
      [token, usuario.id],
    );

    console.log(
      `🔑 Link de reset (DEV): http://localhost:3000/resetar-senha/${token}`,
    );

    return res.json({ message: "Se o e-mail existir, enviaremos instruções." });
  } catch (error) {
    console.error("Erro ao processar recuperação de senha:", error);
    return res.status(500).json({ error: "Erro ao processar solicitação." });
  }
};

exports.resetarSenha = async (req, res) => {
  try {
    const { token } = req.params;
    const { novaSenha } = req.body;

    if (!novaSenha) {
      return res.status(400).json({ error: "Nova senha é obrigatória." });
    }

    const [usuarios] = await db.query(
      "SELECT * FROM usuarios WHERE reset_token=? AND reset_token_expira > NOW()",
      [token],
    );

    if (!usuarios.length) {
      return res.status(400).json({ error: "Token inválido ou expirado." });
    }

    const usuario = usuarios[0];
    const hashSenha = await bcrypt.hash(String(novaSenha), 10);

    await db.query(
      "UPDATE usuarios SET senha=?, reset_token=NULL, reset_token_expira=NULL WHERE id=?",
      [hashSenha, usuario.id],
    );

    return res.json({
      message: "Senha redefinida com sucesso. Faça login com a nova senha.",
    });
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);
    return res.status(500).json({ error: "Erro ao redefinir senha." });
  }
};

// =====================
// Rotas protegidas (admin)
// =====================
exports.listar = async (req, res) => {
  try {
    const [usuarios] = await db.query(
      "SELECT id, empresa_id, nome, email, perfil, status, created_at FROM usuarios WHERE empresa_id=?",
      [req.user.empresa_id],
    );
    res.json(usuarios);
  } catch (err) {
    console.error("Erro ao listar usuários:", err);
    res.status(500).json({ mensagem: "Erro ao listar usuários" });
  }
};

exports.detalhar = async (req, res) => {
  try {
    const { id } = req.params;
    const [usuarios] = await db.query(
      "SELECT id, empresa_id, nome, email, perfil, status, created_at FROM usuarios WHERE id=? AND empresa_id=?",
      [id, req.user.empresa_id],
    );
    if (!usuarios.length)
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    res.json(usuarios[0]);
  } catch (err) {
    console.error("Erro ao detalhar usuário:", err);
    res.status(500).json({ mensagem: "Erro ao buscar usuário" });
  }
};

exports.criar = async (req, res) => {
  try {
    const { nome, email, senha, perfil, status } = req.body;

    const [existe] = await db.query(
      "SELECT id FROM usuarios WHERE email=? AND empresa_id=?",
      [String(email).trim(), req.user.empresa_id],
    );
    if (existe.length)
      return res.status(400).json({ mensagem: "E-mail já cadastrado" });

    const senhaHash = await bcrypt.hash(String(senha), 10);

    await db.query(
      `INSERT INTO usuarios (empresa_id, nome, email, senha, perfil, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [
        req.user.empresa_id,
        String(nome).trim(),
        String(email).trim(),
        senhaHash,
        perfil || "operador",
        status || "ativo",
      ],
    );

    res.status(201).json({ mensagem: "Usuário criado com sucesso" });
  } catch (err) {
    console.error("Erro ao criar usuário:", err);
    res.status(500).json({ mensagem: "Erro ao criar usuário" });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha, perfil, status } = req.body;

    const [usuarios] = await db.query(
      "SELECT * FROM usuarios WHERE id=? AND empresa_id=?",
      [id, req.user.empresa_id],
    );
    if (!usuarios.length)
      return res.status(404).json({ mensagem: "Usuário não encontrado" });

    let senhaHash = usuarios[0].senha;
    if (senha && String(senha).trim()) {
      senhaHash = await bcrypt.hash(String(senha), 10);
    }

    await db.query(
      `UPDATE usuarios
          SET nome=?, email=?, senha=?, perfil=?, status=?
        WHERE id=? AND empresa_id=?`,
      [
        nome ?? usuarios[0].nome,
        email ?? usuarios[0].email,
        senhaHash,
        perfil ?? usuarios[0].perfil,
        status ?? usuarios[0].status,
        id,
        req.user.empresa_id,
      ],
    );

    res.json({ mensagem: "Usuário atualizado com sucesso" });
  } catch (err) {
    console.error("Erro ao atualizar usuário:", err);
    res.status(500).json({ mensagem: "Erro ao atualizar usuário" });
  }
};

exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;

    const [usuarios] = await db.query(
      "SELECT id FROM usuarios WHERE id=? AND empresa_id=?",
      [id, req.user.empresa_id],
    );
    if (!usuarios.length)
      return res.status(404).json({ mensagem: "Usuário não encontrado" });

    await db.query("DELETE FROM usuarios WHERE id=? AND empresa_id=?", [
      id,
      req.user.empresa_id,
    ]);

    res.json({ mensagem: "Usuário removido com sucesso" });
  } catch (err) {
    console.error("Erro ao deletar usuário:", err);
    res.status(500).json({ mensagem: "Erro ao remover usuário" });
  }
};
