const Produto = require('../models/produtoModel');

exports.listar = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  const lista = await Produto.listar(empresa_id);
  res.json(lista);
};

exports.criar = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  const data = { ...req.body, empresa_id };
  const produto = await Produto.criar(data);
  res.status(201).json(produto);
};

exports.atualizar = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  await Produto.atualizar(req.params.id, empresa_id, req.body);
  res.status(204).send();
};

exports.remover = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  await Produto.remover(req.params.id, empresa_id);
  res.status(204).send();
};
