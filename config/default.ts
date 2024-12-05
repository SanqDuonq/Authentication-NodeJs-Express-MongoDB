import dotenv from 'dotenv'
dotenv.config();

export default {
    Port: 8888,
    MongoURI: process.env.MongoURI,
    accessTokenPrivateKey: '',
    refreshTokenPrivateKey: '',
    smtp: {
        user: 'anya.wiegand61@ethereal.email',
        pass: 'gm78UNxrUzPMQc5ATy',
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false
    }
}