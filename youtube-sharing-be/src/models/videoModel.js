import mongoose from 'mongoose'

const videoStatisticsSchema = mongoose.Schema({
  viewCount: { type: Number },
  likeCount: { type: Number },
  dislikeCount:{ type: Number },
  favoriteCount: { type: Number },
  commentCount: { type: Number }
})


const videoSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  statistics: videoStatisticsSchema,
  userEmail: { type: String, ref:'User' }
})

const Video = mongoose.model('Video', videoSchema)

export default Video
