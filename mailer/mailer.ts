import nodemailer from "nodemailer"

// Email config
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "validacion57733@gmail.com",
        pass: "qkjhakwtjnbqohrj"
    },
    from: "validacion57733@gmail.com"
})

// Mail a enviar
export const sendEmail = async (to:string, code: string):Promise<void> => {
    try {
        const email = {
            from: "Validación",
            to,
            subject: "Verificá tu cuenta",
            text: `
                Ingresa el código ${code} para validar tu cuenta.
            `
        }

        await transporter.sendMail(email)
        console.log("Codigo de verificación enviado")
    } catch (error) {
        console.log("Error al enviar el código de verificación: ", error)
    }
}
