import { IUser } from "../interface/user.interface";
import UserModel from "../models/user.model";

function createUser(input: Partial<IUser>){
    return UserModel.create(input)
}

export default {
    createUser
}