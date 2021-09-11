const { response } = require("express");
const Categoria = require("../models/categoria");

const obtenerCategorias = async (req, res = response) => {
    Let { limite = 5, desde = 0 } = req.query;

    limite = Number(limite);
    desde = Number(desde);
    if(isNaN(limite)){
        limite=5;
    }
    if(isNaN(desde)){
        desde=0;
    }
    
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments({estado:true}),
        Categoria.find({estado:true})
        .skip(desde)
        .limit(limite)
        .populate("usuario","nombre email"),

    ])
    res.json({
        Total: total,
        categorias,
    });
};

const obtenerCategoria = async (req, res = response) => {
    const {id} = req.param;
    const categoria = await Categoria.findById(id).populate(
        "usuario",
        "nombre email"
    )
};

const crearCategorias = async ()