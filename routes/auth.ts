import {Router} from "express"
import { check } from "express-validator"
import { login, register, verifyUser } from "../controllers/auth"
import { errorManager } from "../middlewares/error-manager"
import { existingEmail } from "../helpers/db-validation"

const router = Router()

router.post("/register", [
    check("username", "El nombre de usuario es requerido").not().isEmpty(),
    check("email", "La dirección de correo es incorrecta").isEmail(),
    check("password", "La contraseña es incorrecta").isLength({min: 8}),
    check("email").custom(existingEmail),
    errorManager
]
,register)

router.patch("/verify", [
    check("email", "La dirección de correo es incorrecta" ).isEmail(),
    check("code", "El código de recuperación es requerido").not().isEmpty(),
    errorManager
], verifyUser)

router.post("/login", [
    check("email", "La dirección de correo es incorrecta").isEmail(),
    check("password", "La contraseña es requerida").not().isEmpty(),
    errorManager
], login
)

export default router