const path = require("path");
const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

// Garante que pega o .env do ROOT do backend (mgr/backend/.env)
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const cfg = {
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Falha explícita (pra não conectar “vazio” e te confundir)
if (!cfg.user || !cfg.database) {
  console.error("❌ Variáveis de ambiente do banco não carregaram.");
  console.error("DB_HOST:", process.env.DB_HOST);
  console.error("DB_USER:", process.env.DB_USER);
  console.error("DB_NAME:", process.env.DB_NAME);
  throw new Error("Config do MySQL inválida (DB_USER/DB_NAME vazios).");
}

console.log("✅ MySQL cfg:", {
  host: cfg.host,
  user: cfg.user,
  database: cfg.database,
});

const pool = mysql.createPool(cfg);

module.exports = pool;
