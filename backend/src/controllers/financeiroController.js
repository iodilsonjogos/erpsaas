const Financeiro = require('../models/financeiroModel');

exports.listar = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  const lista = await Financeiro.listar(empresa_id);
  res.json(lista);
};

exports.criar = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  const data = { ...req.body, empresa_id };
  const lancamento = await Financeiro.criar(data);
  res.status(201).json(lancamento);
};

exports.atualizar = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  await Financeiro.atualizar(req.params.id, empresa_id, req.body);
  res.status(204).send();
};

exports.remover = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  await Financeiro.remover(req.params.id, empresa_id);
  res.status(204).send();
};
