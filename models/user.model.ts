import mongoose, { Schema } from "mongoose";
import { IUser } from "../interface/user.interface";
import {nanoid} from 'nanoid'
import argon2 from 'argon2'
import log from "../utils/logger";

export const User:Schema<IUser> = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required:true
    },
    verificationCode: {
        type: String,
        required:true,
        default: () => nanoid()
    },
    password: {
        type: String,
        required: true
    },
    passwordResetCode: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
},{timestamps: true})

User.pre("save", async function (next){
    if (!this.isModified('password')){
        return next();
    }
    try {
        const hash = await argon2.hash(this.password)
        this.password = hash;
        next();
    } catch (error) {
        log.error(error,'Fail to hash password')
        next(error as mongoose.CallbackError)
    }
})

User.methods.validatePassword = async function (candidatePassword: string) {
    try {
        return await argon2.verify(this.password,candidatePassword)
    } catch (error) {
        log.error(error,'Count not validate password')
        return false;
    }
}

const UserModel = mongoose.model('User',User)

export default UserModel;
