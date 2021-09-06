const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario o contraseña incorrectos",
      });
    }
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario inactivo - Contactar con el personal",
      });
    }

    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario o contraseña incorrectos",
      });
    }

    const token = await generarJWT(usuario._id);

    res.json({
      msg: "Usuario validado",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Problema de autenticación - Hablar con admin",
    });
  }
};

module.exports = {
  login,
};
