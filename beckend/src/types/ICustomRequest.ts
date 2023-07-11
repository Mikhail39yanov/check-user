import { Request } from 'express'
import { IUser } from './IUser'

export interface ICustomRequest<T> extends Request {
  body: T
  db?: IUser[]
  user?: IUser
}
