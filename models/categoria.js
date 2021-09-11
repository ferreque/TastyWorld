const { Schema, model } = require("mongoose");

const CategoriaSchema = new Schema({
    
    nombre:{
        type:String,
        require:[true,"El nombre de la categoria es requerido"],
        unique:true
    },
    estado:{
        type:Boolean,
        default:true,
        require:true
    }
});


CategoriaSchema.methods.toJSON = function () {
    const { __v, estado, ...categoria } = this.toObject();
    categoria.id = _id;
    return categoria;
};

module.exports=model("Categoria", CategoriaSchema)