import db from '../db/db.json'

export const findUserByUsername = async (email: string) => {
  return db.filter((u) => u.email === email)
}
