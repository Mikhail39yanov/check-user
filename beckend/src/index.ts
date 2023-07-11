import 'dotenv/config.js'
import express, { NextFunction, Request, Response } from 'express'
import { HttpException } from './types/HttpException'
import { routerClients } from './routers'

export const port = process.env.PORT || 3001

export const app = express()
app.use(express.json())

app.use('/api/clients', routerClients)

app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send(err.message)
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
