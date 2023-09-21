import { NextFunction, Request, Response } from "express";

import jwt, { JwtPayload } from "jsonwebtoken";

import User, {IUser} from "../models/user";

export const validateJWT = async (req:Request, res:Response, next:NextFunction):Promise<void> => {
    
    const token = req.headers["x-token"] as string;

    if (!token) {
        res.status(401).json({
            msg: "No hay token en la petición"
        })
        return;
    }

    try {
        const secretKey = process.env.TOKENS_KEY as string;
        const payload = jwt.verify(token, secretKey) as JwtPayload;

        const {id} = payload;

        const userData: IUser | null = await User.findById(id);

        if(!userData) {
            res.status(401).json({
                msg: "Token no valido"
            })
            return;
        }

        req.body.userData = userData

    } catch (error) {
        res.status(401).json({
            msg: "Token no valido"
        })
    }
    next()
}