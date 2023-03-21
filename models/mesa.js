const { Schema, model } = require("mongoose");

const MesaSchema = new Schema({
  numero: {
    type: String,
    require: [true, "El numero es obligatorio"],
  },
  qr: {
    type: String,
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

MesaSchema.methods.toJSON = function () {
  const { __v, _id, ...mesa } = this.toObject();
  mesa.id = _id;
  return mesa;
};

module.exports = model("Mesa", MesaSchema);
