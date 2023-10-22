import express from 'express'

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

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.listen(PORT, HOSTNAME, () => {
  console.log('run sever')
})