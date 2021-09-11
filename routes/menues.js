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
const { idMenuExiste, nombreMenuExiste } = require("../helpers/db-validators");

const {
  menuesGet,
  menuGet,
  menuesPost,
  menuesPut,
  menuesDelete,
} = require("../controllers/menues");

router.get("/", menuesGet);

router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(idMenuExiste),
  ],
  menuGet
);
//agrego validaciones de token y roles
router.post(
  "/",
  [
    validarJWT,
    esAdminRole,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre").custom(nombreMenuExiste),
    check("pais", "El pais es obligatorio").not().isEmpty(),
    check("continente", "El continente es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  menuesPost
);
//agrego validaciones de token y roles
router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "El menu no existe"),
    check("id").custom(idMenuExiste),
    validarCampos,
  ],
  menuesPut
);
//agrego validaciones de token y roles
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(idMenuExiste),
    validarCampos,
  ],
  menuesDelete
);

module.exports = router;
