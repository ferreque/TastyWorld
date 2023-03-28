const { Router } = require("express");
const { check } = require("express-validator");
const { idBebidaExiste } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-rol");

const {
  bebidasGet,
  bebidasPost,
  bebidasPut,
  bebidasDelete,
} = require("../controllers/bebidas");

const router = Router();
router.get("/", bebidasGet);
router.post(
  "/",
  [
    validarJWT,
    esAdminRole,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  bebidasPost
);
router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id válido").isMongoId(),
    check("id").custom(idBebidaExiste),
    validarCampos,
  ],
  bebidasPut
);
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(idBebidaExiste),
    validarCampos,
  ],
  bebidasDelete
);
module.exports = router;
