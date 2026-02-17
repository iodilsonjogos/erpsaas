module.exports = function acl(roles = []) {
  if (typeof roles === "string") roles = [roles];

  return function (req, res, next) {
    if (!req.user || !req.user.perfil) {
      return res.status(401).json({ message: "Usuário não autenticado" });
    }

    if (!roles.includes(req.user.perfil)) {
      return res
        .status(403)
        .json({ message: "Acesso negado: Permissão insuficiente" });
    }

    return next();
  };
};
