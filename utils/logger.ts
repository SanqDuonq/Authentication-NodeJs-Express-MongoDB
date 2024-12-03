import { pino } from 'pino'

const log = pino({
    level: 'info',
    transport: {
        target: 'pino-pretty',   
    },
    base: {
        pid: false
    }
})

export default log