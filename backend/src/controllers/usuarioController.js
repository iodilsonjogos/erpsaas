const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// LISTAR usuários
exports.listar = async (req, res) => {
  const [usuarios] = await db.query('SELECT id, empresa_id, nome, email, perfil, ativo, created_at FROM usuarios');
  res.json(usuarios);
};

// CRIAR usuário
exports.criar = async (req, res) => {
  const { nome, email, senha, perfil, empresa_id, ativo } = req.body;
  const [existe] = await db.query('SELECT * FROM usuarios WHERE email=?', [email]);
  if (existe.length) return res.status(400).json({ mensagem: "E-mail já cadastrado" });
  const hashSenha = await bcrypt.hash(senha, 10);
  await db.query(
    'INSERT INTO usuarios (nome, email, senha, perfil, empresa_id, ativo) VALUES (?, ?, ?, ?, ?, ?)',
    [nome, email, hashSenha, perfil, empresa_id, ativo]
  );
  res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
};

// ATUALIZAR usuário
exports.atualizar = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, perfil, empresa_id, ativo } = req.body;
  let query = 'UPDATE usuarios SET nome=?, email=?, perfil=?, empresa_id=?, ativo=?';
  let params = [nome, email, perfil, empresa_id, ativo];

  if (senha) {
    query += ', senha=?';
    const hashSenha = await bcrypt.hash(senha, 10);
    params.push(hashSenha);
  }
  query += ' WHERE id=?';
  params.push(id);

  await db.query(query, params);
  res.json({ mensagem: "Usuário atualizado com sucesso!" });
};

// DELETAR usuário
exports.deletar = async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM usuarios WHERE id=?', [id]);
  res.json({ mensagem: "Usuário excluído com sucesso!" });
};

// LOGIN usuário
exports.login = async (req, res) => {
  const { email, senha } = req.body;
  const [rows] = await db.query("SELECT * FROM usuarios WHERE email=?", [email]);
  if (!rows.length) return res.status(401).json({ mensagem: "Usuário não encontrado" });
  const usuario = rows[0];
  if (!await bcrypt.compare(senha, usuario.senha)) {
    return res.status(401).json({ mensagem: "Senha inválida" });
  }
  const token = jwt.sign(
    {
      id: usuario.id,
      empresa_id: usuario.empresa_id,
      perfil: usuario.perfil
    },
    process.env.JWT_SECRET,
    { expiresIn: '12h' }
  );
  res.json({ token });
};
