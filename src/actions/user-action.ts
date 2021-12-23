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

export  async function getUsersList(user_username?: string): Promise<IUser[]> {
    try {
        if(!user_username) throw new Error("The username is undefined");
        const users = await UserModel.find({ username: {$ne: user_username}})
        if(users.length === 0) throw new Error("No users found");
        return users
    } catch (error) {
        throw error
    }
}

