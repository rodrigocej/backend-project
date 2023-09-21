import jwt from "jsonwebtoken"

// Generamos el token para la seción del usuario
export const generateToken = (id: string= ""):Promise<string> => {
    return new Promise((res, rej)=> {
        const payload = {id}
        jwt.sign(
            payload,
            process.env.TOKENS_KEY as string,
            {
                expiresIn: "2hr"
            },
            (err: Error | null, token: string | undefined)=> {
                if(err) {
                    console.log(err)
                    rej("No se pudo generar el token session")
                } else {
                    res(token as string)
                }
            }
        ) 
    })
    
}