const { Router } = require("express");
const { check } = require("express-validator");
//importo para hacer validaciones
const { idContinenteExiste } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-rol");

const {
  continentesGet,
  continentesPost,
  continentesPut,
  continentesDelete,
} = require("../controllers/continentes");

const router = Router();
router.get("/", continentesGet);
router.post(
  "/",
  [
    validarJWT,
    esAdminRole,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  continentesPost
);
router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(idContinenteExiste),
    validarCampos,
  ],
  continentesPut
);
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(idContinenteExiste),
    validarCampos,
  ],
  continentesDelete
);
module.exports = router;
