import express from 'express'
import http from 'http'
import { Server as socketIo } from 'socket.io'
import { connectDB } from './config/db.config.js'
import authRoute from './routes/authRoute.js'
import videoRoute from './routes/videoRoute.js'
import 'dotenv/config'

const PORT = process.env.PORT
const app = express()
const server = http.createServer(app)
const io = new socketIo(server)
connectDB()

io.on('connection', (socket) => {
  console.log('A user connected')

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
})

app.use(express.json())
app.use((req, res, next) => {
  res.io = io
  next()
})

app.use(authRoute)
app.use(videoRoute)


server.listen(PORT, () => {
  console.log('listening on *:8080')
})
