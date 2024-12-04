import { Request,Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
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
            text: `Verification Code ${user.verificationCode}. Id: ${user._id}`
        });
        res.send('User successful created')
    } catch (error:any) {
        if (error.code === 11000) {
            res.status(409).send('Account already exists')
        }
        res.status(500).send(error)
    }
}

export default {
    createUserHandler
}