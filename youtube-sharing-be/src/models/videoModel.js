import mongoose from 'mongoose'

const videoStatisticsSchema = mongoose.Schema({
  viewCount: { type: String },
  likeCount: { type: String },
  dislikeCount:{ type: String },
  favoriteCount: { type: String },
  commentCount: { type: String }
})


const videoSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  url: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  statistics: videoStatisticsSchema,
  userEmail: { type: String, ref:'User' }
})

const Video = mongoose.model('Video', videoSchema)

export default Video
