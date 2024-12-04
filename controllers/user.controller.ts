import { Request,Response } from "express";
import { CreateUserInput } from "../schema/user.schema";


async function createUserHandler(req:Request<{},{},CreateUserInput>,res:Response){
    const body = req.body;

}

export default {
    createUserHandler
}