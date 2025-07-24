const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', authRoutes);
// Rotas
app.use('/api/agenda', require('./routes/agendaRoutes'));
app.use('/api/clientes', require('./routes/clienteRoutes'));
app.use('/api/profissionais', require('./routes/profissionalRoutes'));
app.use('/api/servicos', require('./routes/servicoRoutes'));
app.use('/api/vendas', require('./routes/vendaRoutes'));
app.use('/api/produtos', require('./routes/produtoRoutes'));
app.use('/api/financeiro', require('./routes/financeiroRoutes'));
app.use('/api/relatorios', require('./routes/relatorioRoutes'));
app.use('/api/config/empresa', require('./routes/empresaRoutes'));
app.use('/uploads', express.static('uploads'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/agendamento-online', require('./routes/agendamentoOnlineRoutes'));
app.use('/api/onboarding', require('./routes/onboardingRoutes'));



// Healthcheck
app.get('/', (req, res) => res.send('ERP SaaS API rodando!'));

const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;