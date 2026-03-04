// backend/src/middlewares/auth.js
const jwt = require("jsonwebtoken");

function extractToken(req) {
  // 1) Authorization: Bearer <token>  (padrão)
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && typeof authHeader === "string") {
    const parts = authHeader.split(" ");
    if (parts.length === 2 && /^Bearer$/i.test(parts[0]))
      return parts[1].trim();
    // se vier só o token no Authorization (alguns clientes fazem isso)
    if (parts.length === 1) return parts[0].trim();
  }

  // 2) x-access-token (alguns projetos usam isso)
  const xToken = req.headers["x-access-token"];
  if (xToken && typeof xToken === "string") return xToken.trim();

  // 3) querystring token= (debug / casos especiais)
  if (req.query && req.query.token) return String(req.query.token).trim();

  return null;
}

module.exports = (req, res, next) => {
  try {
    const token = extractToken(req);

    if (!token) {
      return res
        .status(401)
        .json({ error: "Acesso negado. Token não fornecido." });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret || !String(secret).trim()) {
      // isso evita “tokens inválidos misteriosos” por env quebrado
      return res
        .status(500)
        .json({ error: "JWT_SECRET ausente no .env do backend." });
    }

    const decoded = jwt.verify(token, String(secret).trim());
    req.user = decoded;

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido." });
  }
};
