import { Request,Response } from "express";
import { CreateUserInput, ForgotPasswordInput, ResetPasswordInput, VerifyUserInput } from "../schema/user.schema";
import userServices from '../services/user.service'
import mail from '../mail/mailer'
import log from "../utils/logger";
import { nanoid } from "nanoid";
import UserModel from "../models/user.model";
async function createUserHandler(req:Request<{},{},CreateUserInput>,res:Response){
    const body = req.body;
    try {
        const user = await userServices.createUser(body);
        await mail.sendMail({
            from: 'namsang0902s@mail.com',
            to: user.email,
            subject: 'Please verify your account',
            text: `Verification Code: ${user.verificationCode}. Id: ${user._id}`
        });
        res.send('User successful created')
    } catch (error:any) {
        if (error.code === 11000) {
            res.status(409).send('Account already exists')
        }
        res.status(500).send(error)
    }
}

async function verifyUserHandler(req:Request<VerifyUserInput>,res:Response){
    const id = req.params.id
    const verificationCode = req.params.verificationCode

    //* find user by id
    const user = await userServices.findUserById(id)
    if (!user) {
        res.send('Could not verify user')
    }

    //* check to see if they are already verify
    if (user?.verified) {
        res.send('user is already verified')
    }

    //* check verify code match
    if (user?.verificationCode === verificationCode) {
        user.verified = true;
        await user.save();
        res.send('User successful verify')
    }
    res.send('Could not verify user')

}   

async function forgotPasswordHandler(req:Request<ForgotPasswordInput>,res:Response){
    const message = 'If a user that email is registered you will receive a password reset email'
    const {email} = req.body;

    const user = await userServices.findUserByEmail(email)

    if (!user) {
        log.debug(`User with email ${email} does not exists`)
        res.send(message)
    }
    if (!user?.verified) {
        res.send('User is not verified')
    }

    const passwordResetCode = nanoid();

    user!.passwordResetCode = passwordResetCode;

    await user!.save();

    await mail.sendMail({
        to: user?.email,
        from: 'namsang0902s@gmail.com',
        subject: 'Reset password successful',
        text: `Password reset code ${passwordResetCode}. Id:${user?._id}`
    })
    log.debug(`Password reset email sent to ${email}`)
    res.send(message);
}
async function resetPasswordHandler(req:Request<ResetPasswordInput['params'],ResetPasswordInput['body']>,res:Response) {
    const {id,passwordResetCode} = req.params;
    const {password} = req.body;

    const user = await userServices.findUserById(id)

    if (!user || !user.passwordResetCode || user.passwordResetCode !== passwordResetCode) {
        res.status(400).send('Could not reset user password')
    }
    user!.passwordResetCode = null;

    user!.password = password;

    await user?.save();

    res.send('Successful update password')

}

export default {
    createUserHandler,
    verifyUserHandler,
    forgotPasswordHandler,
    resetPasswordHandler
}