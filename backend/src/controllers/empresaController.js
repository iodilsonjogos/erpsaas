const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Upload de logo (arquivo imagem)
const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
      return cb(new Error('Apenas imagens .png, .jpg, .jpeg são permitidas'));
    }
    cb(null, true);
  }
});

// Listar empresa logada
exports.get = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT 
        id, nome, cnpj, email, telefone, endereco, logo, plano_id, status,
        confirmacao_agendamento, permite_upsell, confirmacao_baixa, tipo_comissao, valor_comissao
      FROM empresas WHERE id = ?`,
      [req.user.empresa_id]
    );
    if (!rows.length) {
      return res.status(404).json({ message: 'Empresa não encontrada' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar configuração', error: error.message });
  }
};

// Atualizar empresa logada
exports.update = async (req, res) => {
  try {
    const {
      nome, cnpj, email, telefone, endereco, plano_id, status,
      confirmacao_agendamento, permite_upsell, confirmacao_baixa, tipo_comissao, valor_comissao
    } = req.body;
    await db.query(
      `UPDATE empresas SET 
        nome=?, cnpj=?, email=?, telefone=?, endereco=?, plano_id=?, status=?, 
        confirmacao_agendamento=?, permite_upsell=?, confirmacao_baixa=?, tipo_comissao=?, valor_comissao=?
      WHERE id=?`,
      [
        nome, cnpj, email, telefone, endereco, plano_id, status,
        confirmacao_agendamento, permite_upsell, confirmacao_baixa, tipo_comissao, valor_comissao,
        req.user.empresa_id
      ]
    );
    res.json({ message: 'Configuração da empresa atualizada com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar configuração', error: error.message });
  }
};

// Upload de logo da empresa
exports.uploadLogo = [
  upload.single('logo'),
  async (req, res) => {
    const empresa_id = req.user.empresa_id;
    if (!req.file) return res.status(400).json({ erro: 'Arquivo não enviado!' });

    // Move o arquivo para a pasta "uploads/logo_empresa_<id>.ext"
    const ext = path.extname(req.file.originalname).toLowerCase();
    const filename = `logo_empresa_${empresa_id}${ext}`;
    const finalPath = path.join('uploads', filename);

    fs.renameSync(req.file.path, finalPath);
    await db.query(`UPDATE empresas SET logo=? WHERE id=?`, [finalPath, empresa_id]);

    res.json({ mensagem: 'Logo atualizada com sucesso!', logo: finalPath });
  }
];
