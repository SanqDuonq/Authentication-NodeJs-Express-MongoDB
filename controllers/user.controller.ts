import { Request,Response } from "express";
import { CreateUserInput, VerifyUserInput } from "../schema/user.schema";
import userServices from '../services/user.service'
import mail from '../mail/mailer'
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




export default {
    createUserHandler,
    verifyUserHandler
}