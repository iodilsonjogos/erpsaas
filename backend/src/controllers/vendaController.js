
const Venda = require('../models/vendaModel');

exports.listar = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  const lista = await Venda.listar(empresa_id);
  res.json(lista);
};

exports.criar = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  const usuario_id = req.user.id;
  const { itens, ...dados } = req.body;
  const data = { ...dados, empresa_id, usuario_id };
  const venda = await Venda.criar(data, itens || []);
  res.status(201).json(venda);
};

exports.atualizar = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  await Venda.atualizar(req.params.id, empresa_id, req.body);
  res.status(204).send();
};

exports.remover = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  await Venda.remover(req.params.id, empresa_id);
  res.status(204).send();
};