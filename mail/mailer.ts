import nodemailer, { SendMailOptions } from 'nodemailer'
import log from '../utils/logger';
import config from 'config'
import { IMail } from '../interface/mail.interface';
async function createMail(){
    const mail = await nodemailer.createTestAccount();
    log.info(mail);
}

const smtp = config.get<IMail>('smtp')

const transporter = nodemailer.createTransport({
    ...smtp, auth: {user: smtp.user, pass: smtp.pass}
    }
)


async function sendMail(payload : SendMailOptions){
    transporter.sendMail(payload,(err,info) => {
        if (err){
            log.error(err, 'Error sending email');
            return;
        }
        log.info(`Preview URL ${nodemailer.getTestMessageUrl(info)}`)
    })
}

export default {
    createMail,
    sendMail
}
