const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/usuarios");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const {
  esAdminRole,
  esChefRole,
  esWaiterRole,
} = require("../middlewares/validar-rol");
const { emailExiste, idExiste } = require("../helpers/db-validators");

const { Router, request } = require("express");

const router = Router();

router.get("/", usuariosGet);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "La constraseña es obligatoria").not().isEmpty().trim(),
    check(
      "password",
      "La contraseña debe tener al menos 6 caracteres"
    ).isLength({ min: 6 }),
    check("email", "El email es inválido").isEmail(),
    check("email").custom(emailExiste),
    check("rol", "No es un rol válido").isIn([
      "USER_ROLE",
      "ADMIN_ROLE",
      "WAITER_ROLE",
      "CHEF_ROLE",
    ]),
    validarCampos,
  ],
  usuariosPost
);

router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un Id válido").isMongoId(),
    check("id").custom(idExiste),
    validarCampos,
  ],
  usuariosPut
);

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un Id válido").isMongoId(),
    check("id").custom(idExiste),
    validarCampos,
  ],
  usuariosDelete
);

module.exports = router;
