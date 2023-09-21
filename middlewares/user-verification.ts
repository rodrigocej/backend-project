import { NextFunction, Request, Response } from "express";

export const isUserVerified = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    const {verified} = req.body.userData

    if (!verified) {
        res.status(401).json({
            msg: "El usuario no está verificado"
        })
        return
    }
    
    next()
}