import { findMany, findOne } from '../../models/db/initLowDb.js'

export const getData = (req, res) => {
    const { username } = req.query

    if (!username) return res.status(400).contentType('application/json').json({ data: null })

    const data = findOne(username)

    if (!data.length) return res.status(404).contentType('application/json').json({ data: null })

    return res.status(200).contentType('application/json').json({ data })
}

export const getAllData = (req, res) => {
    const data = findMany()
    return res.status(200).contentType('application/json').json({ data })
}