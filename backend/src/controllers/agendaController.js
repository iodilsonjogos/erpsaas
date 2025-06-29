const Agenda = require('../models/agendaModel');

exports.listar = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  const lista = await Agenda.listar(empresa_id);
  res.json(lista);
};

exports.criar = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  const data = { ...req.body, empresa_id, usuario_id: req.user.id };
  const agenda = await Agenda.criar(data);
  res.status(201).json(agenda);
};

exports.atualizar = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  await Agenda.atualizar(req.params.id, empresa_id, req.body);
  res.status(204).send();
};

exports.remover = async (req, res) => {
  const empresa_id = req.user.empresa_id;
  await Agenda.remover(req.params.id, empresa_id);
  res.status(204).send();
};
