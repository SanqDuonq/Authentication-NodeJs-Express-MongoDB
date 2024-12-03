import mongoose from 'mongoose'
import config from 'config'
import log from '../utils/logger';

const MongoURI = config.get<string>('MongoURI')
const connectMongoDB = async () => {
    try {
        const connect = await mongoose.connect(MongoURI);
        log.info(`Connected mongoDB successful ${connect.connection.host}`)
    } catch (error) {
        log.error(`Connected mongoDB fail ${error}`)
        process.exit(1)
    }
}

export default connectMongoDB;
