
const {
  getListaEspera,
  adicionarListaEspera,
  confirmarListaEspera,
  excluirListaEspera,
  getAgendamentosDia,
  getProfissionaisAtivos,
  getDatasEspeciais
} = require ('../controllers/homeController');

const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const homeCtrl = require('../controllers/homeController');

// Lista de espera
router.get("/lista-espera", homeCtrl.getListaEspera);
router.post("/lista-espera", homeCtrl.adicionarListaEspera);
router.put("/lista-espera/:id/confirmar", homeCtrl.confirmarListaEspera);
router.delete("/lista-espera/:id", homeCtrl.excluirListaEspera);

router.get("/agendamentos-dia", auth, homeCtrl.getAgendamentosDia);
router.get("/profissionais", auth, homeCtrl.getProfissionaisAtivos);
router.get("/datas-especiais", auth, homeCtrl.getDatasEspeciais);

module.exports = router;
