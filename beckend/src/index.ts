import 'dotenv/config.js'
import express from 'express'

export const port = process.env.PORT || 3001

export const app = express()

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' })
})

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
