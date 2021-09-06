const {Schema, model} = require('mongoose')

const MesaSchema= new Schema({

    numero:{
        type: Number,
        require:[true, "El numero es obligatorio"],
        unique:true
    },
    qr:{
        type: String,
        require:[true, "El QR code es obligatorio"],
    },
    estado:{
        type:Boolean,
        default:true
    },
})

MesaSchema.methods.toJSON = function () {
    const { __v, _id, ...mesa } = this.toObject();
    mesa.id = _id;
    return mesa;
};

module.exports=model("Mesa", MesaSchema)