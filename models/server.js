const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.usuariosPath = "/api/usuarios";
    this.authPath = "/api/auth";
    this.menuesPath="/api/menues";
    this.mesasPath="/api/mesas";
    this.comandasPath="/api/comandas";
    this.comandasCocinaPath="/api/comandas/cocina";
    this.comandasBarraPath="/api/comandas/barra";
    this.conectarDB();
    this.middlewares();
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(express.static("public"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
    this.app.use(this.mesasPath, require("../routes/mesas"));
    this.app.use(this.menuesPath, require("../routes/productos"));
    this.app.use(this.comandasPath, require("../routes/comandas"));
    this.app.use(this.comandasCocinaPath, require("../routes/comandas"));
    this.app.use(this.comandasBarraPath, require("../routes/comandas"));
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Servidor online puerto", process.env.PORT);
    });
  }
}

module.exports = Server;
