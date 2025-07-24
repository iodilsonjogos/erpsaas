const express = require('express');
const router = express.Router();
const onboardingController = require('../controllers/onboardingController');
const auth = require('../middlewares/auth');

router.get('/progresso', auth, onboardingController.getProgresso);
router.post('/concluir-passo', auth, onboardingController.concluirPasso);

module.exports = router;
