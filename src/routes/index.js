import { Router } from 'express'
import { deleteData } from './controllers/delete.controller.js'
import { getAllData, getData } from './controllers/get.controller.js'
import { postData } from './controllers/post.controller.js'
import { putData } from './controllers/put.controller.js'

export const router = Router()

router.get('/', (req, res) => getAllData(req, res))
router.get('/data', (req, res) => getData(req, res))
router.post('/data', async(req, res) => await postData(req, res))
router.put('/data', async(req, res) => await putData(req, res))
router.put('/data', async(req, res) => await deleteData(req, res))