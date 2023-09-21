import mongoose from "mongoose";

//Conexion con la database de mongodb

export const conectDB = async() => {
    try {
        const dbUrl = process.env.DATABASE_URL
        if(!dbUrl) {
            throw new Error("Variable no definida en .env")
        }
        await mongoose.connect(dbUrl)
        console.log("Base de datos online")
    }
    catch (error) {
        console.error(error)
    }
}