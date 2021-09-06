const { Router } = require('express');
const { check } = require('express-validator')
const router = Router();

//controladores
const {validarCampos} = require("../middlewares/validar-campos")
const { idMenuExiste, nombreMenuExiste } = require('../helpers/db-validators');

const {
    menuesGet,
    menuesPost,
    menuesPut,
    menuesDelete
} = require("../controllers/menues");


router.get("/", menuesGet);

router.post(
    "/",
    [
    check("nombre","El nombre es obligatorio").not().isEmpty(),
    check("nombre").custom(nombreMenuExiste),
    check("pais", "El pais es obligatorio").not().isEmpty(),
    check("continente", "El continente es obligatorio").not().isEmpty(),
    validarCampos
    ],
    menuesPost
);

router.put(
    "/:id",
    [
    check("id", "El menu no existe"),
    check("id").custom(idMenuExiste),
    validarCampos
    ],
    menuesPut
);

router.delete(
    "/:id",
    [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(idMenuExiste),
        validarCampos
    ],
    menuesDelete
);

module.exports = router;