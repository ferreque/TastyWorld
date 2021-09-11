const {request, response}= require('express')
const Comanda=require("../models/comanda")

const comandasGet = async (req = request, res = response)=>{
    
    const comanda = await Comanda.find()

    res.json({
        comanda
    });
}

const comandasCocinaGet = async (req = request, res = response)=>{
    
    const comanda = await Comanda.find({tipo: "Platos", estado: "Pendiente" || "En proceso"})

    res.json({
        comanda
    });
}

const comandasBarraGet = async (req = request, res = response)=>{
    
    const comanda = await Comanda.find({tipo: "Bebida", estado: "Pendiente" || "En proceso"})

    res.json({
        comanda
    });
}

const comandasPost = async (req = request, res = response)=>{
    
    const { plato, cliente, mesa, estado } = req.body;
    const comanda = new Comanda({plato, cliente, mesa, estado });
    await comanda.save()

    res.json({
        msg:"Nueva Tasty comanda se ha creado",
        comanda
    });
}

const comandasPut = async (req = request, res = response)=>{
    const id = req.params.id;
    const {_id, ...resto} = req.body;
    const comanda = await Comanda.findByIdAndUpdate(id, resto, {new: true})
    
    res.json({
        msg:"Tasty comanda modificada coorectamente",
        comanda,
    });
}

const comandasDelete = async (req = request, res = response)=>{
    const id = req.params.id;
    const comanda = await Comanda.findByIdAndDelete(id);
    
    res.json({
        msg:"Una tasty comanda se ha eliminado",
        comanda
    });
}

module.exports={
    comandasGet,
    comandasCocinaGet,
    comandasBarraGet,
    comandasPost,
    comandasPut,
    comandasDelete
};