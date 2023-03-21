const { Schema, model } = require("mongoose");

const ComandaSchema = new Schema({
  producto: {
    type: String,
    require: [true, "El producto es obligatorio"],
  },
  prodId: {
    type: String,
    require: [true, "El id del producto es obligatorio"],
  },
  tipo: {
    type: String,
  },
  cliente: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    require: true,
  },
  nombreCliente: {
    type: String,
  },
  mesa: {
    type: String,
    default: "Take away",
    require: [true, "El numero de mesa es obligatorio"],
  },
  estado: {
    type: String,
    enum: ["Pendiente", "Realizado", "Entregado", "Anulado"],
    require: [true, "El estado es obligatorio"],
    default: "Pendiente",
  },
  hora: {
    type: Date,
  },
  numeroPedido: {
    type: Number,
    require: true,
  },
  descripcion: {
    type: String,
  },
});

ComandaSchema.methods.toJSON = function () {
  const { __v, ...comanda } = this.toObject();
  return comanda;
};

module.exports = model("Comanda", ComandaSchema);
