import dotenv from 'dotenv'
dotenv.config();

export default {
    Port: 8888,
    MongoURI: process.env.MongoURI
}