const { Schema, model } = require("mongoose");
const BebidaSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del tipo de bebida es obligatorio"],
    unique: true,
  },
  img: {
    type: String,
    required: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

BebidaSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();

  return data;
};

module.exports = model("Bebida", BebidaSchema);
