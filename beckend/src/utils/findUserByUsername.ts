import db from '../db/db.json'

export const findUserByUsername = async (email: string, number: string) => {
  return db.find((u) => u.email === email && u.number === number)
}
