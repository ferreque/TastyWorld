const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();

//controladores
const {validarCampos} = require("../middlewares/validar-campos")
const { idComandaExiste } = require('../helpers/db-validators');

const {
    comandasGet,
    comandasPost,
    comandasPut,
    comandasDelete
} = require("../controllers/comandas");


router.get("/", comandasGet);

router.post(
    "/",
    [
    check("plato","El numero de mesa es obligatorio").not().isEmpty(),
    validarCampos
    ],
    comandasPost
);

router.put(
    "/:id",
    [
    check("id", "El menu no existe"),
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