import { IUser } from "../interface/user.interface";
import UserModel from "../models/user.model";

function createUser(input: Partial<IUser>){
    return UserModel.create(input)
}

function findUserById(id: string){
    return UserModel.findById(id)
}

export default {
    createUser,
    findUserById
}