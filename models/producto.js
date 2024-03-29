const { Schema, model } = require("mongoose");

const ProductoSchema = new Schema({
  nombre: {
    type: String,
    require: [true, "El nombre del producto es obligatorio"],
    unique: true,
  },
  pais: {
    type: String,
    require: [true, "El pais es obligatorio"],
  },
  continente: {
    type: String,
    require: [true, "El continente es obligatorio"],
  },
  img: {
    type: String,
    require: true,
  },
  precio: {
    type: String,
    default: null,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    require: true,
  },
  descripcion: {
    type: String,
  },
});

ProductoSchema.methods.toJSON = function () {
  const { __v, ...producto } = this.toObject();
  return producto;
};

module.exports = model("Producto", ProductoSchema);
