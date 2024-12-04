import { IUser } from "../interface/user.interface";
import UserModel from "../models/user.model";

function createUser(input: Partial<IUser>){
    return UserModel.create(input)
}

function findUserById(id: string){
    return UserModel.findById(id)
}

function findUserByEmail(email:string){
    return UserModel.findOne({email});
}

export default {
    createUser,
    findUserById,
    findUserByEmail
}