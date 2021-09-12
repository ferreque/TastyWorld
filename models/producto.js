const { Schema, model } = require("mongoose");

const ProductoSchema= new Schema({

    nombre:{
        type: String,
        require:[true, "El nombre es obligatorio"],
        unique:true
    },
    tipo:{
        type:String,
        enum:["Plato","Bebida","Promo"]
    },
    pais:{
        type: String,
        require:[true, "El email es obligatorio"],
    },
    continente:{
        type: String,
        require:[true, "La contraseña es obligatoria"]
    },
    img:{
        type: String,
        require:true
    },
    precio:{
        type:String,
        default: null
    },
    estado:{
        type:Boolean,
        default:true
    },
})

ProductoSchema.methods.toJSON = function () {
  const { __v, _id, ...producto } = this.toObject();
  producto.pid = _id;
  return producto;
};

module.exports = model("Producto", ProductoSchema);
