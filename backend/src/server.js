const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");

const app = express();

// CORS (dev): liberado. Quando for postar na Hostinger, a gente restringe origin.
app.use(cors());
app.use(express.json());

// Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas públicas (auth)
app.use("/api/auth", authRoutes);

// Home / API base
app.use("/api/home", homeRoutes);
app.use("/home", homeRoutes);

// Rotas do ERP
app.use("/api/agenda", require("./routes/agendaRoutes"));
app.use("/api/clientes", require("./routes/clienteRoutes"));
app.use("/api/profissionais", require("./routes/profissionalRoutes"));
app.use("/api/servicos", require("./routes/servicoRoutes"));
app.use("/api/vendas", require("./routes/vendaRoutes"));
app.use("/api/produtos", require("./routes/produtoRoutes"));
app.use("/api/financeiro", require("./routes/financeiroRoutes"));
app.use("/api/relatorios", require("./routes/relatorioRoutes"));
app.use("/api/config/empresa", require("./routes/empresaRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/usuarios", require("./routes/usuarioRoutes"));
app.use("/api/agendamento-online", require("./routes/agendamentoOnlineRoutes"));
app.use("/api/onboarding", require("./routes/onboardingRoutes"));

// Uploads
app.use("/uploads", express.static("uploads"));

// Healthcheck
app.get("/", (req, res) => res.send("ERP SaaS API rodando!"));

// (Opcional) mantém seu /api/homeRoutes como catch-all, mas no final:
app.use("/api", require("./routes/homeRoutes"));

const PORT = process.env.PORT || 4000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;
