const {Schema, model} = require('mongoose')

const MenuSchema= new Schema({

    nombre:{
        type: String,
        require:[true, "El nombre es obligatorio"],
        unique:true
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

MenuSchema.methods.toJSON = function () {
    const { __v, _id, ...menu } = this.toObject();
    menu.mid = _id;
    return menu;
};

module.exports=model("Menu", MenuSchema)