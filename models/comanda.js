const { Schema, model } = require("mongoose");

const ComandaSchema = new Schema({
  plato: {
    type: String,
    require: [true, "El nombre es obligatorio"],
  },
  mesa: {
    type: Schema.Types.ObjectId,
    ref: "Mesa",
    require: true,
  },
  estado: {
    type: String,
    enum: ["Pendiente", "En proceso", "Realizado", "Entregado", "Anulado"],
    require: [true, "El estado es obligatorio"],
    default: "Pendiente",
  },
});

ComandaSchema.methods.toJSON = function () {
  const { __v, _id, ...comanda } = this.toObject();
  comanda.id = _id;
  return comanda;
};

module.exports = model("Comanda", ComandaSchema);
