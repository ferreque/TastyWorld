const { Schema, model } = require("mongoose");

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatorio"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ["USER_ROLE", "ADMIN_ROLE", "WAITER_ROLE", "CHEF_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("Usuario", UsuarioSchema);
