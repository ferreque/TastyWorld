const {request, response}= require('express');
const { body } = require('express-validator');
const Menu=require("../models/menu")

const menuesGet = async (req = request, res = response)=>{
    
    const menu = await Menu.find({estado: true})

    res.json({
        menu
    });
}

const menuesPost = async (req = request, res = response)=>{
    
    const { nombre, pais, continente, img, precio } = req.body;
    const menu = new Menu({nombre, pais, continente, img, precio});
    await menu.save()

    res.json({
        msg:"Nuevo Tasty menu se ha creado",
        menu
    });
}

const menuesPut = async (req = request, res = response)=>{
    
    const id = req.params.id;
    const { _id, ...resto } = req.body;
    const menu = await Menu.findByIdAndUpdate(id, resto,{new: true})
    
    res.json({
        msg:"Tasty menu modificado coorectamente",
        menu,
    });
}

const menuesDelete = async (req = request, res = response)=>{
    const id = req.params.id;
    const menu = await Menu.findByIdAndDelete(id);
    
    res.json({
        msg:"Un tasty menu se ha eliminado",
        menu
    });
}

module.exports={
    menuesGet,
    menuesPost,
    menuesPut,
    menuesDelete
};