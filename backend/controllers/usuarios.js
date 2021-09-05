const { request, response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");

const usuariosGet = (req = request, res = response) => {
  res.json({
    msg: "GET",
  });
};

const usuariosPost = async (req = request, res = response) => {
  const { nombre, email, password, rol } = req.body;

  const usuario = new Usuario({ nombre, email, password, rol });

  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);

  await usuario.save();

  res.json({
    msg: "Usuario creado",
    usuario,
  });
};

const usuariosPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, nombre, email, password, ...rest } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync(10);
    rest.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, rest, { new: true });
  res.json({
    msg: "PUT",
    usuario,
  });
};

const usuariosDelete = async (req = request, res = response) => {
  const id = req.params.id;

  const usuario = await Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.json({
    msg: "DELETE",
    usuario,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};
