const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();

//controladores
const {validarCampos} = require("../middlewares/validar-campos")
const { idComandaExiste } = require('../helpers/db-validators');

const {
    comandasGet,
    comandasCocinaGet,
    comandasPost,
    comandasPut,
    comandasDelete
} = require("../controllers/comandas");


router.get("/", comandasGet);
router.get("/cocina", comandasCocinaGet);

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
    validarCampos
    ],
    comandasPut
);

router.delete(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(idComandaExiste),
        validarCampos
    ],
    comandasDelete
);

module.exports = router;