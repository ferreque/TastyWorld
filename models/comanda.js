const {Schema, model} = require('mongoose')

const ComandaSchema= new Schema({

    plato:{
        type: String,
        require:[true, "El nombre es obligatorio"],
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
    /*categoria:{
        tyep:Schema.Types.ObjectId,
        ref:"Categoria",
        require:true
    },*/
    descripcion:{
        type:String,
    },
})

ComandaSchema.methods.toJSON = function () {
    const { __v, ...comanda } = this.toObject();
    comanda.id = _id;
    return comanda;
};

module.exports = model("Comanda", ComandaSchema);
