const { response, request } = require("express");
const Continente = require("../models/continente");
const continentesGet = async (req = request, res = response) => {
  const continente = await Continente.find({ estado: true });
  res.json({
    continente,
  });
};

const continentesPost = async (req = request, res = response) => {
  const { nombre, img } = req.body;
  const continenteDB = await Continente.findOne({ nombre });
  if (continenteDB) {
    return res.status(400).json({
      msg: `El Tasty continente ${continenteDB.nombre} ya existe`,
    });
  }
  const data = {
    nombre,
    img,
    usuario: req.usuario._id,
  };
  const continente = new Continente(data);
  await continente.save();
  res.status(201).json({
    msg: "Nuevo Tasty continente creado",
    continente,
  });
};

const continentesPut = async (req = request, res = response) => {
  const id = req.params.id;

  const { _id, ...resto } = req.body;
  const continente = await Continente.findByIdAndUpdate(id, resto, {
    new: true,
  });

  res.json({
    msg: "Tasty continente actualizado",
    continente,
  });
};

const continentesDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const continente = await Continente.findByIdAndDelete(id, { new: true });
  res.json({
    msg: "Tasty continente eliminado",
    continente,
  });
};
module.exports = {
  continentesGet,
  continentesPost,
  continentesPut,
  continentesDelete,
};
