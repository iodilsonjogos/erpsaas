const Profissional = require('../models/profissionalModel');

exports.listar = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  const lista = await Profissional.listar(empresa_id);
  res.json(lista);
};

exports.criar = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  const data = { ...req.body, empresa_id };
  const profissional = await Profissional.criar(data);
  res.status(201).json(profissional);
};

exports.atualizar = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  await Profissional.atualizar(req.params.id, empresa_id, req.body);
  res.status(204).send();
};

exports.remover = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  await Profissional.remover(req.params.id, empresa_id);
  res.status(204).send();
};
