const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "Debe ingresar el token",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const usuario = await Usuario.findById(uid);

    if (!usuario) {
      return res.status(401).json({
        msg: "Token inválido - Usuario inexistente",
      });
    }
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Token inválido - Usuario inactivo",
      });
    }
    req.usuario = usuario;

    next();
  } catch (error) {
    res.status(401).json({
      msg: "Token inválido",
    });
  }
};

module.exports = { validarJWT };
