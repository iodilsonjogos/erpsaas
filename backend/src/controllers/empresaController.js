const Empresa = require('../models/empresaModel');

exports.getEmpresa = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  const empresa = await Empresa.getById(empresa_id);
  res.json(empresa);
};

exports.atualizarEmpresa = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  await Empresa.atualizar(empresa_id, req.body);
  res.status(204).send();
};

exports.uploadLogo = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  // Salve o caminho do arquivo no banco
  const logoPath = '/uploads/' + req.file.filename;
  await db.query('UPDATE empresas SET logo=? WHERE id=?', [logoPath, empresa_id]);
  res.json({ logo: logoPath });
};
