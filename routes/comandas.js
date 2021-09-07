const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

//controladores
const { validarCampos } = require("../middlewares/validar-campos");
//agrego validaciones de token y roles
//NO SE DONDE USARLOS
const {
  esAdminRole,
  esChefRole,
  esWaiterRole,
} = require("../middlewares/validar-rol");
const { validarJWT } = require("../middlewares/validar-jwt");
const { idComandaExiste } = require("../helpers/db-validators");

const {
  comandasGet,
  comandasPost,
  comandasPut,
  comandasDelete,
} = require("../controllers/comandas");

router.get("/", comandasGet);

router.post(
  "/",
  [
    check("plato", "El plato a pedir es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  comandasPost
);

router.put(
  "/:id",
  [
    check("id", "El menu no existe").isMongoId(),
    check("id").custom(idComandaExiste),
    validarCampos,
  ],
  comandasPut
);

router.delete(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(idComandaExiste),
    validarCampos,
  ],
  comandasDelete
);

module.exports = router;
