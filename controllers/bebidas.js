const { response, request } = require("express");
const Bebida = require("../models/bebida");

const bebidasGet = async (req = request, res = response) => {
  const bebida = await Bebida.find({ estado: true });
  res.json({
    bebida,
  });
};

const bebidasPost = async (req = request, res = response) => {
  const { nombre, img } = req.body;
  const bebidaDB = await Bebida.findOne({ nombre });
  if (bebidaDB) {
    return res.status(400).json({
      msg: `La Tasty bebida ${bebidaDB.nombre} ya existe`,
    });
  }
  const data = {
    nombre,
    img,
    usuario: req.usuario._id,
  };
  const bebida = new Bebida(data);
  await bebida.save();
  res.status(201).json({
    msg: "Nueva Tasty bebida creado",
    bebida,
  });
};

const bebidasPut = async (req = request, res = response) => {
  const id = req.params.id;

  const { _id, ...resto } = req.body;
  const bebida = await Bebida.findByIdAndUpdate(id, resto, {
    new: true,
  });

  res.json({
    msg: "Tasty bebida actualizada",
    bebida,
  });
};

const bebidasDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const bebida = await Bebida.findByIdAndDelete(id, { new: true });
  res.json({
    msg: "Tasty bebida eliminado",
    bebida,
  });
};
module.exports = {
  bebidasGet,
  bebidasPost,
  bebidasPut,
  bebidasDelete,
};
