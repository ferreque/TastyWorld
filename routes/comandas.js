const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

//controladores
const { validarCampos } = require("../middlewares/validar-campos");
const { idComandaExiste } = require('../helpers/db-validators');
const { esAdminRole, esAdminOrChefRole, esAdminOrWaiterRole } = require("../middlewares/validar-rol");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
    comandasGet,
    comandasCocinaGet,
    comandasBarraGet,
    comandasEntregasGet,
    comandasPost,
    comandasPut,
    comandasDelete
} = require("../controllers/comandas");


//Privado
router.get(
    "/",
    [
        validarJWT,
        esAdminRole,
        validarCampos
    ],
    comandasGet,
);

router.get(
    "/cocina",
    [
        validarJWT,
        esAdminOrChefRole,
        validarCampos
    ],
    comandasCocinaGet
);

router.get(
    "/barra",
    [
        validarJWT,
        esAdminOrWaiterRole,
        validarCampos
    ],
    comandasBarraGet,
);

router.get(
    "/entregas",
    [
        validarJWT,
        esAdminOrWaiterRole,
        validarCampos
    ],
    comandasEntregasGet,
);

//publico
router.post(
    "/",
    [
        check("producto", "El producto es obligatorio").not().isEmpty(),
        check("mesa", "El numero de mesa es obligatorio"),
        validarCampos
    ],
    comandasPost
);

//privado
router.put(
    "/:id",
    [
        validarJWT,
        esAdminRole,
        check("id", "El ID de comanda indicado no existe").isMongoId(),
        check("id").custom(idComandaExiste),
        validarCampos
    ],
    comandasPut
);

router.delete(
    "/:id",
    [
        validarJWT,
        esAdminRole,
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(idComandaExiste),
        validarCampos
    ],
    comandasDelete

);

module.exports = router;
