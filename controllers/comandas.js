const { request, response } = require("express");
const Comanda = require("../models/comanda");
const Producto = require("../models/producto");
const Usuario = require("../models/usuario");

const comandasGet = async (req = request, res = response) => {
  const comanda = await Comanda.find();

  res.json({
    comanda,
  });
};

const comandasCocinaGet = async (req = request, res = response) => {
  const comanda = await Comanda.find({ estado: { $in: ["Pendiente", "Realizado"] }, tipo: "Plato" });
  res.json({ comanda });
};

const comandasBarraGet = async (req = request, res = response) => {
  const comanda = await Comanda.find({ estado: { $in: ["Pendiente", "Realizado"] }, tipo: "Bebida" });
  res.json({ comanda });
};

const comandasEntregasGet = async (req = request, res = response) => {
  const comanda = await Comanda.find({ estado: "Realizado" });
  res.json({ comanda });
};

const comandasPost = async (req, res = response) => {
  const { ...body } = req.body;
  const prod = await Producto.findById(body.prodId);
  const tipo = prod.tipo;
  const cli = await Usuario.findById(body.cliente);
  const nombreCliente = cli.nombre;
  const data = {
    tipo,
    nombreCliente,
    hora: new Date(),
    ...body,
  };
  const comanda = new Comanda(data);
  await comanda.save();

  res.status(201).json({
    msg: "Tasty comanda creada correctamente",
    comanda,
  });
};

const comandasPostAdmin = async (req, res = response) => {
  const comanda = new Comanda({ ...req.body, hora: new Date() });
  await comanda.save();

  res.status(201).json({
    msg: "Tasty comanda creada correctamente",
    comanda,
  });
};

const getHistorial = async (req = request, res = response) => {
  const uid = req.usuario._id;
  const comanda = await Comanda.find({ cliente: uid }).sort({ hora: -1 });
  res.json({ comanda });
};

const getSeguimiento = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const comanda = await Comanda.findById(id).select("producto mesa estado numeroPedido hora tipo");
    if (!comanda) return res.status(404).json({ msg: "Comanda no encontrada" });
    res.json({ comanda });
  } catch (error) {
    res.status(400).json({ msg: "ID inválido" });
  }
};

const comandasPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { ...resto } = req.body;
  const comanda = await Comanda.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    msg: "Tasty comanda modificada correctamente",
    comanda,
  });
};

const comandasDelete = async (req = request, res = response) => {
  const id = req.params.id;
  const comanda = await Comanda.findByIdAndDelete(id);

  res.json({
    msg: "Una tasty comanda se ha eliminado",
    comanda,
  });
};

module.exports = {
  comandasGet,
  comandasCocinaGet,
  comandasBarraGet,
  comandasEntregasGet,
  comandasPost,
  comandasPostAdmin,
  getHistorial,
  getSeguimiento,
  comandasPut,
  comandasDelete,
};
