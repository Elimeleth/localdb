import { create } from '../../models/db/initLowDb.js'

export const postData = async(req, res) => {
    const { data } = req.body
    if (typeof data !== 'object') return res.status(400).contentType('application/json').json({ message: 'Error de dato' })

    try {
        const result = await create(data)

        return res.status(200).contentType('application/json').json({ result })
    } catch (error) {
        return res.status(422).contentType('application/json').json({ message: 'Error inesperado' })
    }
}