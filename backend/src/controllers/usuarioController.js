
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// LISTAR usuários
exports.listar = async (req, res) => {
  try {
    const [usuarios] = await db.query(
      'SELECT id, empresa_id, nome, email, perfil, status AS ativo, created_at FROM usuarios'
    );
    res.json(usuarios);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    res.status(500).json({ mensagem: 'Erro ao listar usuários' });
  }
};

// CRIAR usuário (status automático = 'ativo')
exports.criar = async (req, res) => {
  try {
    const { nome, email, senha, perfil, empresa_id } = req.body;

    const [existe] = await db.query('SELECT * FROM usuarios WHERE email=?', [email]);
    if (existe.length) return res.status(400).json({ mensagem: "E-mail já cadastrado" });

    const hashSenha = await bcrypt.hash(senha, 10);

    const status = 'ativo'; // fixo

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

// ATUALIZAR usuário
exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha, perfil, empresa_id, status } = req.body;

    let query = 'UPDATE usuarios SET nome=?, email=?, perfil=?, empresa_id=?, status=?';
    let params = [nome, email, perfil, empresa_id, status];

    if (senha) {
      query += ', senha=?';
      const hashSenha = await bcrypt.hash(senha, 10);
      params.push(hashSenha);
    }

    query += ' WHERE id=?';
    params.push(id);

    await db.query(query, params);
    res.json({ mensagem: "Usuário atualizado com sucesso!" });
  } catch (err) {
    console.error('Erro ao atualizar usuário:', err);
    res.status(500).json({ mensagem: "Erro ao atualizar usuário" });
  }
};

// DELETAR usuário
exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM usuarios WHERE id=?', [id]);
    res.json({ mensagem: "Usuário excluído com sucesso!" });
  } catch (err) {
    console.error('Erro ao excluir usuário:', err);
    res.status(500).json({ mensagem: "Erro ao excluir usuário" });
  }
};

// LOGIN usuário
exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const [rows] = await db.query("SELECT * FROM usuarios WHERE email=? AND status='ativo'", [email]);
    if (!rows.length) return res.status(401).json({ mensagem: "Usuário não encontrado" });

    const usuario = rows[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) return res.status(401).json({ mensagem: "Senha inválida" });

    const token = jwt.sign(
      {
        id: usuario.id,
        empresa_id: usuario.empresa_id,
        perfil: usuario.perfil
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
