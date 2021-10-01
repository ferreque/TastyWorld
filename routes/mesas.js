const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { validarCampos } = require("../middlewares/validar-campos");

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

router.get(
  "/todas",
  [validarJWT, esAdminOrWaiterRole, validarCampos],
  mesasTodasGet
);

router.post(
  "/",
  [
    validarJWT,
    esAdminOrWaiterRole,
    check("numero", "El tasty numero de la tasty mesa es tasty obligatorio")
      .not()
      .isEmpty(),
    check("capacidad", "La capacidad de la tasty mesa es obligatoria")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  mesasPost
);

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
