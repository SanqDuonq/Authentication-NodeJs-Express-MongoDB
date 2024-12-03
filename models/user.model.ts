import mongoose, { Schema } from "mongoose";
import { IUser } from "../interface/user.interface";
import {nanoid} from 'nanoid'

const User:Schema<IUser> = new Schema({
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
    }
})

const UserModel = mongoose.model('User',User)

export default UserModel;
