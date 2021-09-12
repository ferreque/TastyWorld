const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

//controladores
const { validarCampos } = require("../middlewares/validar-campos");
const { idComandaExiste } = require('../helpers/db-validators');
const { esAdminRole, esChefRole, esWaiterRole } = require("../middlewares/validar-rol");

const {
    comandasGet,
    comandasCocinaGet,
    comandasBarraGet,
    comandasPost,
    comandasPut,
    comandasDelete
} = require("../controllers/comandas");


//Privado
router.get(
    "/",
    comandasGet,
    //esAdminRole
);
router.get(
    "/cocina",
    comandasCocinaGet,
    //esChefRole
);
router.get(
    "/barra",
    comandasBarraGet,
    esWaiterRole
    );

router.post(
    "/",
    [
    check("plato", "El plato es obligatorio").not().isEmpty(),
    check("mesa", "El numero de mesa es obligatorio"),
    validarCampos
    ],
    comandasPost
);

router.put(
    "/:id",
    [
    check("id", "El ID de comanda indicado no existe"),
    check("id").custom(idComandaExiste),
    validarCampos,
    esAdminRole
    ],
    comandasPut
);

router.delete(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(idComandaExiste),
        validarCampos,
        esAdminRole,
    ],
    comandasDelete

);

module.exports = router;
