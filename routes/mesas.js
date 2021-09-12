const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

//controladores
const { validarCampos } = require("../middlewares/validar-campos");
//agrego validaciones de token y roles
const {
  esAdminRole,
  esChefRole,
  esWaiterRole,
} = require("../middlewares/validar-rol");
const { validarJWT } = require("../middlewares/validar-jwt");
const { idMesaExiste } = require("../helpers/db-validators");

const {
  mesasGet,
  mesasPost,
  mesasPut,
  mesasDelete,
} = require("../controllers/mesas");

router.get("/", mesasGet);
//agrego validaciones de token y roles
router.post(
  "/",
  [
    validarJWT,
    esAdminRole || esWaiterRole,
    check("numero", "El numero de mesa es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  mesasPost
);
//agrego validaciones de token y roles
router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole || esWaiterRole,
    check("id", "El menu no existe"),
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
    esAdminRole || esWaiterRole,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(idMesaExiste),
    validarCampos,
  ],
  mesasDelete
);

module.exports = router;
