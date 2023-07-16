import express from 'express'
import db from '../db/db.json'
import { ICustomRequest } from '../types/ICustomRequest'
import { IUser } from '../types/IUser'
import { findUserByUsername } from '../utils/findUserByUsername'

const routerClients = express.Router()

routerClients.post('/', async (req: ICustomRequest<IUser>, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const { email } = req.body

    const database = db

    if (!database) {
      return
    }

    const user = await findUserByUsername(email)
    console.log(user)
    if (user.length === 0) {
      return res.json([{ clientNotFound: 'Client not found' }])
    }

    res.json(user)
  } catch (error) {
    if (error) {
      console.error('error==>', error)
    } else {
      res.status(500).send('Internal Server Error')
    }
  }
})

export { routerClients }
