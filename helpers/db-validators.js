const Usuario = require("../models/usuario");
const Menu = require("../models/menu")
const Mesa = require("../models/mesa")
const Comanda = require("../models/comanda")
const Categoria = require("../models/categoria")

const emailExiste = async (email = "") => {
  const existeEmail = await Usuario.findOne({ email });

  if (existeEmail) {
    throw new Error(`El email ${email} ya se encuentra registrado`);
  }
};

const idUsuarioExiste = async (id) => {
  const existeUsuario = await Usuario.findById(id);

  if (!existeUsuario) {
    throw new Error("El id de usuario es inexistente");
  }
};

//Menu
const nombreMenuExiste = async (nombre="") =>{
  const nombreMenuExiste = await Menu.findOne({nombre})

  if(nombreMenuExiste){
      throw new Error(`El menu ${nombre} ya se encuentra registrado`)
  }
};


const idMenuExiste = async (id) =>{
  const menuExiste = await Menu.findById(id)

  if(!menuExiste){
      throw new Error(`El id ${id} no existe`)
  }
};

//mesas
const idMesaExiste = async (id) =>{
  const mesaExiste = await Mesa.findById(id)

  if(!mesaExiste){
      throw new Error(`El id ${id} no existe`)
  }
};

//comandas
const idComandaExiste = async (id) =>{
  const comandaExiste = await Comanda.findById(id)

  if(!comandaExiste){
      throw new Error(`El id ${id} no existe`)
  }
};

//categorias
const existeCategoria = async (id) =>{
  const existeCat = await Categoria.findById(id)

  if(!existeCat){
      throw new Error(`El id ${id} no existe`)
  }
};


module.exports = {
  emailExiste,
  idUsuarioExiste,
  nombreMenuExiste,
  idMenuExiste,
  idMesaExiste,
  idComandaExiste,
  existeCategoria
};
