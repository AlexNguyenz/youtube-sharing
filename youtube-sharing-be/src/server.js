import express from 'express'
import http from 'http'
import cors from 'cors'
import { Server as socketIo } from 'socket.io'
import { connectDB } from './config/db.config.js'
import authRoute from './routes/authRoute.js'
import videoRoute from './routes/videoRoute.js'
import 'dotenv/config'

const PORT = process.env.PORT
const app = express()

const originUrl = process.env.NODE_ENV ? process.env.URL_FE: 'http://localhost:3000'
const server = http.createServer(app, { cors: {
  origin: originUrl
} })
const io = new socketIo(server)
connectDB()

io.on('connection', (socket) => {
  console.log('A user connected')

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
})

app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
  res.io = io
  next()
})

app.use(authRoute)
app.use(videoRoute)


server.listen(PORT, () => {
  console.log('Server running')
})

export default server
