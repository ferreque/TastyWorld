const { request, response } = require("express");
const Trago = require("../models/trago");

const tragosGetAll = async (req = request, res = response) => {
  const trago = await Trago.find();

  res.json({
    trago,
  });
};

//medifico tragosGet
const tragosGet = async (req = request, res = response) => {
  let { limite = 5, desde = 0 } = req.query;

  limite = Number(limite);
  desde = Number(desde);
  if (isNaN(limite)) {
    limite = 5;
  }
  if (isNaN(desde)) {
    desde = 0;
  }
  const [total, tragos] = await Promise.all([
    Trago.countDocuments({ estado: true }),
    Trago.find({ estado: true })
      .skip(desde)
      .limit(limite)
      .populate("usuario", "nombre"),
  ]);

  res.json({
    Total: total,
    tragos,
  });
};

//agrego tragoGet
const tragoGet = async (req = request, res = response) => {
  const { id } = req.params;

  const trago = await Trago.findById(id).populate("usuario", "nombre");
  res.json({
    trago,
  });
};
//Modifico el POST
const tragosPost = async (req = request, res = response) => {
  const { nombre, continenteB, img, precio, estado, descripcion } = req.body;

  const tragoDB = await Trago.findOne({ nombre });
  if (tragoDB) {
    return res.status(400).json({
      msg: `La bebida ${tragoDB.nombre} ya existe`,
    });
  }

  const data = {
    nombre,
    continenteB,
    img,
    precio,
    estado,
    usuario: req.usuario._id,
    descripcion,
  };

  const trago = new Trago(data);
  await trago.save();
  res.status(201).json({
    msg: "Nueva Tasty bebida creada",
    trago,
  });
};

const tragosPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, ...resto } = req.body;
  const trago = await Trago.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    msg: "Tasty bebida modificado correctamente",
    trago,
  });
};

const tragoDelete = async (req = request, res = response) => {
  const id = req.params.id;
  const trago = await Trago.findByIdAndDelete(id, { new: true });

  res.json({
    msg: "Un tasty trago se ha eliminado",
    trago,
  });
};

module.exports = {
  tragosGetAll,
  tragosGet,
  tragoGet,
  tragosPost,
  tragosPut,
  tragoDelete,
};
