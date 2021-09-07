const { Schema, model } = require("mongoose");

const MenuSchema = new Schema({
  nombre: {
    type: String,
    require: [true, "El nombre del plato es obligatorio"],
    unique: true,
  },
  pais: {
    type: String,
    require: [true, "El pais de origen del plato es obligatorio"],
  },
  continente: {
    type: String,
    require: [true, "El nombre del continente es obligatorio"],
  },
  img: {
    type: String,
  },
  precio: {
    type: String,
    default: null,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  descripcion: {
    type: String,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    require: true,
  },
});

MenuSchema.methods.toJSON = function () {
  const { __v, _id, ...menu } = this.toObject();
  menu.mid = _id;
  return menu;
};

module.exports = model("Menu", MenuSchema);
