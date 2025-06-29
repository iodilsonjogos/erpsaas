const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (roles = []) => {
  if (typeof roles === 'string') roles = [roles];
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token não informado.' });
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ error: 'Token inválido.' });
      if (roles.length && !roles.includes(user.perfil)) {
        return res.status(403).json({ error: 'Acesso negado.' });
      }
      req.user = user;
      next();
    });
  };
};
