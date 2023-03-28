const { Schema, model } = require("mongoose");

const TragoSchema = new Schema({
  nombre: {
    type: String,
    require: [true, "El nombre del trago es obligatorio"],
    unique: true,
  },
  continenteB: {
    type: String,
    require: [true, "El Tipo de trago es obligatorio"],
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

TragoSchema.methods.toJSON = function () {
  const { __v, ...trago } = this.toObject();
  return trago;
};

module.exports = model("Trago", TragoSchema);
