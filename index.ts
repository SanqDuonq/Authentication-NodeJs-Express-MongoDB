import express from 'express'
import config from 'config'
import log from './utils/logger';
import connectMongoDB from './database/connect-mongoDB';
import routes from './routes/index.route'
const app = express();

const port = config.get<number>('Port');

app.use(express.json());
app.use(routes);


app.listen(port, () => {
    log.info(`App started at http://localhost:${port}`);
    connectMongoDB();
})
