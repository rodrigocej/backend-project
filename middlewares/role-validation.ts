import { NextFunction, Request, Response } from "express";

import { ROLES } from "../helpers/constants";

export const adminCheck =async (req:Request, res:Response, next:NextFunction) => {
    const {role} = req.body.userData

    if(role !== ROLES.admin) {
        res.status(401).json({
            msg: "No tienes permiso para realizar esta acción"
        })
        return
    }

    next()
}