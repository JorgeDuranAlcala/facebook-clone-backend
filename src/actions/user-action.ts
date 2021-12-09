import { IUser, UserModel } from "../models/user";

export  async function createUser(userData:IUser): Promise<IUser> {
    try {
        const newUser = new UserModel(userData)
        const user = await newUser.save()
        return user
    } catch (error) {
        throw error
    }
}

export  async function validateUser(username: string, password: string): Promise<IUser> {
    try {
        const user = await UserModel.findOne({username})
        if(!user) throw new Error("Not found");
        const valid_password = await user.comparePassword(password)
        if(!valid_password) throw new Error("Invalid password");
        return user
    } catch (error) {
        throw error
    }
}