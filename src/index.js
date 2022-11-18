import Express from 'express'
import morgan from 'morgan'
import cron from 'node-cron'
import { differenceInSeconds } from 'date-fns'
import cors from 'cors'

import { initDb, findMany, update, updateOne } from './models/db/initLowDb.js'
import { router } from './routes/index.js'

import { config } from 'dotenv'
config()

const app = Express()
const PORT = process.env.PORT || 9612
app.use(Express.urlencoded({ extended: true }))
app.use(Express.json())
app.use(cors({
    origin: '*'
}))
app.use(morgan('tiny'))
app.use('/', router)

app.all('*', (req, res) => {
    return res.status(404).contentType('application/json').json({ message: 'Not found' })
})

app.listen(PORT, async() => {
    await initDb()
    console.log(`http://localhost:${PORT}`)

    try {
        cron.schedule('* * * * * *', async() => {
            const data = findMany()
            if (!data.length) return null
            data.map(async d => {
                if (Math.abs(parseInt(d.expired_at) <= 0)) {
                    const newData = data.filter(current => current.expired_at !== d.expired_at)

                    await update(newData)
                } else {
                    d.expired_at = Math.abs(d.expired_at - 1)
                    await updateOne(d)
                }
            })
        });

    } catch (error) {
        console.log(error);
    }
})