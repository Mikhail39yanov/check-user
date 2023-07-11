import express, { NextFunction, Request, Response } from 'express'
import db from '../db/db.json'
import { ICustomRequest } from '../types/ICustomRequest'
import { IUser } from '../types/IUser'
import { findUserByUsername } from '../utils/findUserByUsername'

let previousRequest: number = 0

const routerClients = express.Router()

const repeatRequestMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (previousRequest >= 1) {
    res.send('A repeat request cannot be sent!')
    previousRequest = 0
  } else {
    previousRequest++
    next()
  }
}

routerClients.post('/', repeatRequestMiddleware, async (req: ICustomRequest<IUser>, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 5000))

    const { email, number } = req.body

    const database = db

    if (!database) {
      return
    }

    const user = await findUserByUsername(email, number)

    if (!user) {
      return res.json({ clientNotFound: 'Client not found' })
    }

    res.json({ email: user.email, number: user.number })
  } catch (error) {
    if (error) {
      console.error('error==>', error)
    } else {
      res.status(500).send('Internal Server Error')
    }
  } finally {
    previousRequest = 0
  }
})

export { routerClients }
