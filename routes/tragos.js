const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

//controladores
const { validarCampos } = require("../middlewares/validar-campos");

//agrego validaciones de token y roles
const { esAdminRole } = require("../middlewares/validar-rol");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  idTragoExiste,
  nombreTragoExiste,
} = require("../helpers/db-validators");

const {
  tragosGetAll,
  tragosGet,
  tragoGet,
  tragosPost,
  tragosPut,
  tragoDelete,
} = require("../controllers/trago");

router.get("/all", [validarJWT, validarCampos], tragosGetAll);

router.get("/", tragosGet);

router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(idTragoExiste),
  ],
  tragoGet
);

//agrego validaciones de token y roles
router.post(
  "/",
  [
    validarJWT,
    esAdminRole,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre").custom(nombreTragoExiste),
    check("tipo", "El tipo es obligatorio").not().isEmpty(),
    check("bebida", "La clase de bebida es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  tragosPost
);

//Privado - agrego validaciones de token y roles @frequena
router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "El trago no existe").isMongoId(),
    check("id").custom(idTragoExiste),
    validarCampos,
  ],
  tragosPut
);

//agrego validaciones de token y roles
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(idTragoExiste),
    validarCampos,
  ],
  tragoDelete
);

module.exports = router;
