import express from 'express'
import { connectDB } from './config/db.config.js'
import authRoute from './routes/authRoute.js'
import videoRoute from './routes/videoRoute.js'
import 'dotenv/config'


// GET
// https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id={ID_VIDEO}&key={API_KEY_YOUTUBE}

//DTO
// const snippet = {
//   title:'',
//   description: ''
// }

// const statistics = {
//   viewCount: 3016373,
//   likeCount: 10888,
//   dislikeCount:0,
//   favoriteCount: 0,
//   commentCount: 548
// }

const app = express()
const PORT = 8080
const HOSTNAME = 'localhost'

connectDB()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.use('/', authRoute)
app.use('/', videoRoute)

app.listen(PORT, HOSTNAME, () => {
  console.log('run sever')
})