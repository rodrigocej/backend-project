import { Request, Response } from "express"
import User, { IUser } from "../models/user"
import bcrypsjs from "bcryptjs"
import { ROLES } from "../helpers/constants"
import Randomstring from "randomstring"
import { sendEmail } from "../mailer/mailer"
import { generateToken } from "../helpers/tokensmanager"

export const register = async (req: Request, res: Response): Promise<void> => {
    // Guarda variables del request body
    const { username, email, firstName, lastName, password, role }: IUser = req.body
    const user = new User({ username, email, firstName, lastName, password, role })
    // Guarda el password encriptado con bcryptjs
    const salt = bcrypsjs.genSaltSync()
    user.password = bcrypsjs.hashSync(password, salt)
    // Si el user tiene admin key se guarda, si no sigue ejecutandose
    const adminKey = req.headers["admin-key"]
    if (adminKey === process.env.ADMIN_KEY) {
        user.role = ROLES.admin
    }
    // Genera un codigo de verificacion para el user y lo guarda
    const newCode = Randomstring.generate(6)
    user.code = newCode
    // Guarda el usuario en database y responde status 201 al cliente
    await user.save()
    await sendEmail(email, newCode)
    res.status(201).json({
        msg: "Usuario creado",
        user
    })
}

export const verifyUser = async (req: Request, res: Response): Promise<void> => {
    const { email, code }: IUser = req.body
    try {
        // Se busca el email en la db
        const user = await User.findOne({ email })
        // Error si no se encuentra el email
        if (!user) {
            res.status(400).json({
                msg: "No se encontro la dirección de correo"
            })
            return
        }
        // Error si ya se se procedió a la verificación
        if (user.verified) {
            res.status(400).json({
                msg: "El usuario se encuentra verificado"
            })
        }
        // Errror si el código de verificación es invalido
        if (user.code !== code) {
            res.status(400).json({
                msg: "El código ingresado es inválido"
            })
        }
        // Update al campo verified del user
        await User.findOneAndUpdate({ email }, { verified: true })
        // Respuesta positiva al cliente
        res.status(200).json({
            msg: "El usuario se verificó correctamente"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error en el servidor"
        })
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password }: IUser = req.body
        // Se busca el usuario por la direccion de mail y se responde al cliente en caso negativo
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({
                msg: "No se encontró el email"
            })
            return
        }
        // Se verifica si el hash corresponde a la contraseña y se responde al cliente en caso negativo
        const verifyPassword = bcrypsjs.compareSync(password, user.password)
        if (!verifyPassword) {
            res.status(400).json({
                msg: "La contraseña es incorrecta"
            })
            return
        }
        // Se genera el web token para la seción del cliente
        const token = await generateToken(user.id)

        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error en el servidor"
        })
    }

}