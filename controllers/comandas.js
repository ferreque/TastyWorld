const { request, response } = require("express");
const Comanda = require("../models/comanda");

const comandasGet = async (req = request, res = response) => {
  const comanda = await Comanda.find({ estado: true }).populate(
    "mesa",
    "numero"
  );

  res.json({
    comanda,
  });
};
//modifico, agrego conexion con mesa
const comandasPost = async (req = request, res = response) => {
  const { plato, mesa, estado } = req.body;
  const comanda = new Comanda({ plato, mesa, estado });
  await comanda.save();

  res.json({
    msg: "Nueva Tasty comanda se ha creado",
    comanda,
  });
};

const comandasPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, ...resto } = req.body;
  const comanda = await Mesa.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    msg: "Tasty comanda modificada coorectamente",
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
  comandasPost,
  comandasPut,
  comandasDelete,
};
