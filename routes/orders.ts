import { Router } from "express";
import { check } from "express-validator";
import { createOrder, getOrders } from "../controllers/orders";
import { errorManager } from "../middlewares/error-manager";
import { validateJWT } from "../middlewares/token-validation";
import { isUserVerified } from "../middlewares/user-verification";

const router = Router()

router.get("/", [validateJWT, errorManager], getOrders)

router.post("/", [
    validateJWT, 
    isUserVerified,
    check("price", "El precio es obligatorio").not().isEmpty(),
    check("shippingCost", "El costo de envio es obligatorio").not().isEmpty(),
    check("total", "El total es obligatorio").not().isEmpty(),
    check("details", "Los detalles de envio son obligatorios").not().isEmpty(),
    check("products", "La lista de productos es obligatoria").not().isEmpty(),
    errorManager], 
    createOrder
    )

export default router