const { request, response } = require("express");
// const { body } = require("express-validator");
const Producto = require("../models/producto");

//medifico productosGet
const productosGet = async (req = request, res = response) => {
  let { limite = 5, desde = 0 } = req.query;

  limite = Number(limite);
  desde = Number(desde);
  if (isNaN(limite)) {
    limite = 5;
  }
  if (isNaN(desde)) {
    desde = 0;
  }
  const [total, productos] = await Promise.all([
    Producto.countDocuments({ estado: true }),
    Producto.find({ estado: true })
      .skip(desde)
      .limit(limite)
      .populate("usuario", "nombre"),
  ]);

  res.json({
    Total: total,
    productos,
  });
};

//agrego productoGet
const productoGet = async (req = request, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findById(id).populate("usuario", "nombre");
  res.json({
    producto,
  });
};
//Modifico el POST
const productosPost = async (req = request, res = response) => {
  //verifico que el plato que se quiere agregar no exista ya
  console.log(req.body)
  
  const { nombre, tipo, pais, continente, img, precio, estado, descripcion } =
  req.body;

  const productoDB = await Producto.findOne({ nombre });
  if (productoDB) {
    return res.status(400).json({
      msg: `El menú ${productoDB.nombre} ya existe`,
    });
  }
    
  const data = {
    nombre,
    tipo,
    pais,
    continente,
    img,
    precio,
    estado,
    usuario: req.usuario._id,
    descripcion
  };

  const producto = new Producto(data);
  await producto.save();
  res.status(201).json({
    msg: "Nuevo Tasty producto se ha creado",
    producto,
  });
};

const productosPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, ...resto } = req.body;
  const producto = await Producto.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    msg: "Tasty producto modificado coorectamente",
    producto,
  });
};

const productoDelete = async (req = request, res = response) => {
  const id = req.params.id;
  const producto = await Producto.findByIdAndDelete(id, { new: true });
  
  res.json({
    msg: "Un tasty producto se ha eliminado",
    producto,
  });
};

module.exports = {
  productosGet,
  productoGet,
  productosPost,
  productosPut,
  productoDelete,
};
