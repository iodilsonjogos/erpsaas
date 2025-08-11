// /backend/src/middlewares/acl.js

/**
 * Middleware de controle de acesso por perfil de usuário (ACL)
 * Permite restringir rotas a perfis específicos.
 * Exemplo de uso: acl(['admin']) ou acl(['admin', 'operador'])
 */

module.exports = function acl(roles = []) {
  if (typeof roles === 'string') roles = [roles];
  
  return function (req, res, next) {

    if (!req.user || !req.user.perfil) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    if (!roles.includes(req.user.perfil)) {
      return res.status(403).json({ message: 'Acesso negado: Permissão insuficiente' });
    }

    next();
  };
};
