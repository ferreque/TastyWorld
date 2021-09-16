const {Schema, model} = require('mongoose')

const ComandaSchema= new Schema({

    producto:{
        type: String,
        require:[true, "El producto es obligatorio"],
    },
    cantidad:{
        type: Number,
        default:1
    },
    tipo:{
        type: Schema.Types.ObjectId,
        ref:"Producto",
        require:true
    },
    cliente:{
        type: Schema.Types.ObjectId,
        ref:"Usuario",
        require:true
    },
    mesa:{
        type: Number,
        require:[true, "El numero de mesa es obligatorio"],
    },
    estado:{
        type: String,
        enum:["Pendiente", "En proceso", "Realizado", "Entregado", "Anulado"],
        require:[true, "El estado es obligatorio"],
        default: "Pendiente"
    },
    descripcion:{
        type:String,
    },
})

ComandaSchema.methods.toJSON = function () {
    const { __v, ...comanda } = this.toObject();
    return comanda;
};

module.exports = model("Comanda", ComandaSchema);
