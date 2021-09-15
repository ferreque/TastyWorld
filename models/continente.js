const { Schema, model } = require("mongoose");
const ContinenteSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del continente es obligatorio"],
    unique: true,
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

ContinenteSchema.methods.toJSON = function () {
  const { __v, _id, ...data } = this.toObject();

  return data;
};

module.exports = model("Continente", ContinenteSchema);
