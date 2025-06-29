const Cliente = require('../models/clienteModel');

exports.listar = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  const lista = await Cliente.listar(empresa_id);
  res.json(lista);
};

exports.criar = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  const data = { ...req.body, empresa_id };
  const cliente = await Cliente.criar(data);
  res.status(201).json(cliente);
};

exports.atualizar = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  await Cliente.atualizar(req.params.id, empresa_id, req.body);
  res.status(204).send();
};

exports.remover = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  await Cliente.remover(req.params.id, empresa_id);
  res.status(204).send();
};
