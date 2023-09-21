import {Router } from "express";
import { postIssue } from "../controllers/issues";
import { validateJWT } from "../middlewares/token-validation";
import { adminCheck } from "../middlewares/role-validation";
import { check } from "express-validator";
import { errorManager } from "../middlewares/error-manager";

const router = Router()

router.post("/", [
    validateJWT,
    adminCheck,
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("description", "La descripcion es obligatoria").not().isEmpty(),
    check("priority", "La prioridad es obligatoria").not().isEmpty(),
    errorManager
], postIssue)

export default router