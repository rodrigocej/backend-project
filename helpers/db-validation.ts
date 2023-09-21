import User, {IUser} from "../models/user";

export const existingEmail =async (email:string):Promise<void> => {
    const emailExist : IUser | null = await User.findOne({email})

    if(emailExist) {
        throw new Error ("Esta direccción de correo ya se encuentra registrada")
    }
}