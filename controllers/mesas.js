const { request, response } = require("express");
const Mesa = require("../models/mesa");

const mesasGet = async (req = request, res = response) => {
  let { limite = 0, desde = 0 } = req.query;
  limite = Number(limite);
  desde = Number(desde);

  const mesa = await Mesa.find({ estado: true }).limit(limite).skip(desde);

  const total = await Mesa.countDocuments({ estado: true });
  res.json({
    Total: total,
    mesa,
  });
};
//argego get de todas las mesas
const mesasTodasGet = async (req = request, res = response) => {
  let { limite = 0, desde = 0 } = req.query;
  limite = Number(limite);
  desde = Number(desde);

  const mesa = await Mesa.limit(limite).skip(desde);

  const total = await Mesa.countDocuments();
  res.json({
    Total: total,
    mesa,
  });
};

const mesasPost = async (req = request, res = response) => {
  const { numero, qr, estado } = req.body;
  const mesa = new Mesa({ numero, qr, estado });
  await mesa.save();

  res.json({
    msg: "Nueva Tasty mesa se ha creado",
    mesa,
  });
};

const mesasPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, ...resto } = req.body;
  const mesa = await Mesa.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    msg: "Tasty mesa modificada correctamente",
    mesa,
  });
};

const mesasDelete = async (req = request, res = response) => {
  const id = req.params.id;
  const mesa = await Mesa.findByIdAndDelete(id, { new: true });

  res.json({
    msg: "Una tasty mesa se ha eliminado",
    mesa,
  });
};

module.exports = {
  mesasGet,
  mesasTodasGet,
  mesasPost,
  mesasPut,
  mesasDelete,
};
