const { request, response } = require("express");

const esAdminRole = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se debe verificar el token primero",
    });
  }
  const { rol, nombre } = req.usuario;

  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es administrador`,
    });
  }
  next();
};

const esChefRole = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se debe verificar el token primero",
    });
  }
  const { rol, nombre } = req.usuario;

  if (rol !== "CHEF_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es cocinero`,
    });
  }
  next();
};

const esWaiterRole = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se debe verificar el token primero",
    });
  }
  const { rol, nombre } = req.usuario;

  if (rol !== "WAITER_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es mozo`,
    });
  }
  next();
};
//creo validacion nueva
const esAdminOrWaiterRole = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se debe verificar el token primero",
    });
  }
  const { rol, nombre } = req.usuario;

  if (rol !== "WAITER_ROLE" && rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `El rol de ${nombre} es inválido`,
    });
  }
  next();
};

const esAdminOrChefRole = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se debe verificar el token primero",
    });
  }
  const { rol, nombre } = req.usuario;

  if (rol !== "CHEF_ROLE" && rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `El rol de ${nombre} es inválido`,
    });
  }
  next();
};

const esStaffRole = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se debe verificar el token primero",
    });
  }
  const { rol, nombre } = req.usuario;

  if (rol !== "CHEF_ROLE" && rol !== "ADMIN_ROLE" && rol !== "WAITER_ROLE") {
    return res.status(401).json({
      msg: `El rol de ${nombre} es inválido`,
    });
  }
  next();
};

module.exports = {
  esAdminRole,
  esChefRole,
  esWaiterRole,
  esAdminOrWaiterRole,
  esAdminOrChefRole,
  esStaffRole
};
