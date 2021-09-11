const { Router } = require("express");
const { check } = require("express-validator");
const { existeCategoria } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-rol");

const{
    obtenerCategorias,
    obtenerCategoria,
    crearCategorias,
    actualizarCategoria,
    borrarCategoria,
} = require("../controllers/categorias");

const router = Router();

//publico
router.get("/", obtenerCategorias)
router.get(
    "/:id",[
        check("id", "No es un id valido").isMongoId(),
        check("id").custom(existeCategoria),
        validarCampos,
    ],
    obtenerCategoria,
);

//privado
router.post(
    "/",
    [
        validarJWT,
        esAdminRole,
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
    ],
    crearCategorias
);

router.put(
    "/:id",
    [
        validarJWT,
        check("id", "No es un ID Valido").isMongoId(),
        check("id").custom,(existeCategoria),
        validarCampos
    ],
    actualizarCategoria
);

router.delete(
    "/:id"
    [
        validarJWT,
        esAdminRole,
        check("id", "No es un ID Valido").isMongoId(),
        check("id").custom,(existeCategoria),
        validarCampos
    ],
    borrarCategoria
);

module.exports = router;

