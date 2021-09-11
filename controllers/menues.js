const { request, response } = require("express");
// const { body } = require("express-validator");
const Menu = require("../models/menu");

//medifico menuesGet
const menuesGet = async (req = request, res = response) => {
  let { limite = 5, desde = 0 } = req.query;

  limite = Number(limite);
  desde = Number(desde);
  if (isNaN(limite)) {
    limite = 5;
  }
  if (isNaN(desde)) {
    desde = 0;
  }
  const [total, menues] = await Promise.all([
    Menu.countDocuments({ estado: true }),
    Menu.find({ estado: true })
      .skip(desde)
      .limit(limite)
      .populate("usuario", "nombre"),
  ]);

  res.json({
    Total: total,
    menues,
  });
};
//agrego menuGet
const menuGet = async (req = request, res = response) => {
  const { id } = req.params;

  const menu = await Menu.findById(id).populate("usuario", "nombre");
  res.json({
    menu,
  });
};
//Modifico el POST
const menuesPost = async (req = request, res = response) => {
  //verifico que el plato que se quiere agregar no exista ya
  const { nombre, pais, continente, img, precio } =
    req.body.nombre.toUpperCase();
  const menuDB = await Menu.findOne({ nombre });

  if (menuDB) {
    return res.status(400).json({
      msg: `El menú ${menuDB.nombre} ya existe`,
    });
  }
  const data = {
    nombre,
    pais,
    continente,
    img,
    precio,
    usuario: req.usuario._id,
  };

  const menu = new Menu(data);
  await menu.save();
  res.status(201).json({
    msg: "Nuevo Tasty menu se ha creado",
    menu,
  });
};

const menuesPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, ...resto } = req.body;
  const menu = await Menu.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    msg: "Tasty menu modificado coorectamente",
    menu,
  });
};

const menuesDelete = async (req = request, res = response) => {
  const id = req.params.id;
  const menu = await Menu.findByIdAndDelete(id);

  res.json({
    msg: "Un tasty menu se ha eliminado",
    menu,
  });
};

module.exports = {
  menuesGet,
  menuGet,
  menuesPost,
  menuesPut,
  menuesDelete,
};
