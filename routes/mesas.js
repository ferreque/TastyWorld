const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

//controladores
const { validarCampos } = require("../middlewares/validar-campos");
//agrego validaciones de token y roles
const { esAdminOrWaiterRole } = require("../middlewares/validar-rol");
const { validarJWT } = require("../middlewares/validar-jwt");
const { idMesaExiste } = require("../helpers/db-validators");

const {
  mesasGet,
  mesasTodasGet,
  mesasPost,
  mesasPut,
  mesasDelete,
} = require("../controllers/mesas");

//Publico
router.get("/", mesasGet);

//getTODAS LAS MESAS
router.get(
  "/todas",
  [validarJWT, esAdminOrWaiterRole, validarCampos],
  mesasTodasGet
);

//agrego validaciones de token y roles @frequena
router.post(
  "/",
  [
    validarJWT,
    esAdminOrWaiterRole,
    check("numero", "El tasty numero de la tasty mesa es tasty obligatorio")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  mesasPost
);

//agrego validaciones de token y roles
router.put(
  "/:id",
  [
    validarJWT,
    esAdminOrWaiterRole,
    check("id", "La tasty mesa no existe").isMongoId(),
    check("id").custom(idMesaExiste),
    validarCampos,
  ],
  mesasPut
);

//agrego validaciones de token y roles
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminOrWaiterRole,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(idMesaExiste),
    validarCampos,
  ],
  mesasDelete
);

module.exports = router;
