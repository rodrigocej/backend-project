import { Model, Schema, model } from "mongoose";
import { ROLES } from "../helpers/constants";

export interface IUser {
    username: string,
    firstName?: string,
    lastName?: string,
    email: string,
    password: string,
    code?: string,
    role?: string,
    verified?: boolean
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, "El nombre de usuario es obligatorio"]
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 8,
        required: [true, "La contraseña es obligatoria"]
    },
    code: {
        type: String
    },
    role: {
        type: String,
        default: ROLES.user
    },
    verified: {
        type: Boolean,
        default: false
    }

})

userSchema.methods.toJSON = function() {
    const {__v, password, _id, code, ...user} = this.toObject()
    return user
}

const User: Model<IUser> = model<IUser>("User", userSchema)

export default User