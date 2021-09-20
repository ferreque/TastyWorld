const { request, response } = require('express')
const { body } = require('express-validator')
const Comanda = require('../models/comanda')
const Producto = require('../models/producto')
const Usuario = require('../models/usuario')

const comandasGet = async (req = request, res = response) => {
  const comanda = await Comanda.find()

  res.json({
    comanda,
  })
}

const comandasCocinaGet = async (req = request, res = response) => {
  const comandaFiltrada = await Promise.all([
    Comanda.find({ estado: 'Pendiente' || 'En proceso', tipo: 'Plato' }),
  ])
  const comanda = comandaFiltrada[0]
  res.json({
    comanda,
  })
}

const comandasBarraGet = async (req = request, res = response) => {
  const comandaFiltrada = await Promise.all([
    Comanda.find({ estado: 'Pendiente' || 'En proceso', tipo: 'Bebida' }),
  ])
  const comanda = comandaFiltrada[0]
  res.json({
    comanda,
  })
}

const comandasEntregasGet = async (req = request, res = response) => {
  const comandaFiltrada = await Promise.all([
    Comanda.find({ estado: 'Realizado' }),
  ])
  console.log(comandaFiltrada[0])
  const comanda = comandaFiltrada[0]
  res.json({
    comanda,
  })
}

const comandasPost = async (req, res = response) => {
  const { ...body } = req.body
  const prod = await Producto.findById(body.prodId)
  const tipo = prod.tipo
  const cli = await Usuario.findById(body.cliente)
  const nombreCliente = cli.nombre
  const data = {
    tipo,
    nombreCliente,
    ...body,
  }
  const comanda = new Comanda(data)
  await comanda.save()

  res.status(201).json({
    msg: 'Tasty comanda creada coorectamente',
    comanda,
  })
}

const comandasPut = async (req = request, res = response) => {
  const id = req.params.id
  const { _id, ...resto } = req.body
  const comanda = await Comanda.findByIdAndUpdate(id, resto, { new: true })

  res.json({
    msg: 'Tasty comanda modificada coorectamente',
    comanda,
  })
}

const comandasDelete = async (req = request, res = response) => {
  const id = req.params.id
  const comanda = await Comanda.findByIdAndDelete(id)

  res.json({
    msg: 'Una tasty comanda se ha eliminado',
    comanda,
  })
}

module.exports = {
  comandasGet,
  comandasCocinaGet,
  comandasBarraGet,
  comandasEntregasGet,
  comandasPost,
  comandasPut,
  comandasDelete,
}
