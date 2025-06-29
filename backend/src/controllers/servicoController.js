const Servico = require('../models/servicoModel');

exports.listar = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  const lista = await Servico.listar(empresa_id);
  res.json(lista);
};

exports.criar = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  const data = { ...req.body, empresa_id };
  const servico = await Servico.criar(data);
  res.status(201).json(servico);
};

exports.atualizar = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  await Servico.atualizar(req.params.id, empresa_id, req.body);
  res.status(204).send();
};

exports.remover = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  await Servico.remover(req.params.id, empresa_id);
  res.status(204).send();
};
