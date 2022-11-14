import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'

import lodash from 'lodash'

import { fileURLToPath } from 'url'
import { formatDistance, subSeconds } from 'date-fns'

const __dirname = dirname(fileURLToPath(
    import.meta.url));
export let db

export const initDb = async() => {
    // Use JSON file for storage
    const file = join(__dirname, '../../data', 'db.json')
    const adapter = new JSONFile(file)
    db = new Low(adapter)

    // Read data from JSON file, this will set db.data content
    await db.read()

    // If file.json doesn't exist, db.data will be null
    // Set default data
    db.data = db.data || { data: [] }
        // db.data = db.data || { posts: [] } // for node < v15.x
}

export const findOne = (username) => {
    // ...
    // Note: db.data needs to be initialized before lodash.chain is called.
    db.chain = lodash.chain(db.data)
    const result = db.chain
        .get('data')
        .value() || []
    let data
    try {

        data = result.length ? result.filter(data => data && data.username === username) : []

    } catch (error) {
        console.log(error)
    }
    return data
}

export const findMany = () => {
    // ...
    // Note: db.data needs to be initialized before lodash.chain is called.
    db.chain = lodash.chain(db.data)
    const result = db.chain
        .get('data')
        .value() || []


    return result
}

export const create = async(data) => {
    if (typeof data !== 'object') return null

    try {
        // ...
        // Note: db.data needs to be initialized before lodash.chain is called.
        const label = formatDistance(subSeconds(Date.now(), parseInt(data.expired_at)), Date.now())
        db.data.data.push({
            label,
            create_at: Date.now(),
            ...data

        })
        return await db.write()
    } catch (error) {
        console.log(error)
    }
}


export const update = async(data) => {
    if (typeof data !== 'object') return null

    db.data.data = data

    return await db.write()
}

export const updateOne = async(data) => {
    if (typeof data !== 'object') return null

    try {
        db.data.data = db.data.data.map(d => {
            if (d) {
                if (d.create_at === data.create_at) {
                    d = data
                }
                return data
            }
        })
    } catch (error) {
        console.log(error)
    }

    return await db.write()
}

export const deleteOne = async(data) => {
    if (typeof data !== 'object') return null

    try {
        db.data.data = db.data.data.filter(d => d.username !== data.username)
    } catch (error) {
        console.log(error)
    }

    return await db.write()
}