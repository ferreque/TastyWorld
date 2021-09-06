const {request, response}= require('express')
const Comanda=require("../models/comandas")

const comandasGet = async (req = request, res = response)=>{
    
    const comanda= await Comanda.find({estado: true})

    res.json({
        comanda
    });
}

const comandasPost = async (req = request, res = response)=>{
    
    const { plato, cliente, estado } = req.body;
    const comanda = new Mesa({plato, cliente, estado });
    await comanda.save()

    res.json({
        msg:"Nueva Tasty comanda se ha creado",
        comanda
    });
}

const comandasPut = async (req = request, res = response)=>{
    const id = req.params.id;
    const {_id, ...resto} = req.body;
    const comanda = await Mesa.findByIdAndUpdate(id, resto, {new: true})
    
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
    comandasPost,
    comandasPut,
    comandasDelete
};