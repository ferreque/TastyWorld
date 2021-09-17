const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

//controladores
const { validarCampos } = require("../middlewares/validar-campos");

//agrego validaciones de token y roles
const { esAdminRole } = require("../middlewares/validar-rol");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  idProductoExiste,
  nombreProductoExiste,
} = require("../helpers/db-validators");

const {
  productosGetAll,
  productosGet,
  productoGet,
  productosPost,
  productosPut,
  productoDelete,
} = require("../controllers/productos");

router.get(
  "/all",[
  validarJWT,
  esAdminRole,
  validarCampos,
],
 productosGetAll
);

router.get("/", productosGet);

router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(idProductoExiste),
  ],
  productoGet
);

//agrego validaciones de token y roles
router.post(
  "/",
  [
    validarJWT,
    esAdminRole,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("nombre").custom(nombreProductoExiste),
    check("tipo", "El tipo es obligatorio").not().isEmpty(),
    check("pais", "El pais es obligatorio").not().isEmpty(),
    check("continente", "El continente es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  productosPost
);

//Privado - agrego validaciones de token y roles @frequena
router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "El producto no existe").isMongoId(),
    check("id").custom(idProductoExiste),
    validarCampos,
  ],
  productosPut
);

//agrego validaciones de token y roles
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(idProductoExiste),
    validarCampos,
  ],
  productoDelete
);

module.exports = router;
