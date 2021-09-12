const Usuario = require("../models/usuario");

const Producto = require("../models/producto")
const Mesa = require("../models/mesa")
const Comanda = require("../models/comanda")

const emailExiste = async (email = "") => {
  const existeEmail = await Usuario.findOne({ email });

  if (existeEmail) {
    throw new Error(`El email ${email} ya se encuentra registrado`);
  }
};

const idUsuarioExiste = async (id) => {
  const existeUsuario = await Usuario.findById(id);

  if (!existeUsuario) {
    throw new Error("El id de usuario es inexistente");
  }
};

//Producto
const nombreProductoExiste = async (nombre = "") => {
  const nombreProductoExiste = await Producto.findOne({ nombre });

  if (!nombreProductoExiste) {
    throw new Error(`El plato ${nombre} no existe en nuestro menú`);
  }
};

const idProductoExiste = async (id) => {
  const productoExiste = await Producto.findById(id);

  if (!productoExiste) {
    throw new Error(`El id ${id} no existe`);
  }
};

//mesas
const idMesaExiste = async (id) => {
  const mesaExiste = await Mesa.findById(id);

  if (!mesaExiste) {
    throw new Error(`El id ${id} no existe`);
  }
};

//comandas
const idComandaExiste = async (id) => {
  const comandaExiste = await Comanda.findById(id);

  if (!comandaExiste) {
    throw new Error(`El id ${id} no existe`);
  }
};



module.exports = {
  emailExiste,
  idUsuarioExiste,
  nombreProductoExiste,
  idProductoExiste,
  idMesaExiste,
  idComandaExiste
};
