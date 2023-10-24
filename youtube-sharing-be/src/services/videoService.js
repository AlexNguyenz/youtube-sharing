import Video from '../models/videoModel.js'


const shareVideo = async (url, email) => {
  try {
    const existingUser = await Video.findOne({ url })
    if (existingUser) {
      return { success: false, message: 'Video already exists' }
    }
    const statistics= {
      viewCount: 10,
      likeCount: 10,
      dislikeCount:10,
      favoriteCount: 10,
      commentCount: 10
    }
    const newVideo = new Video({ url, title:'Title', description:'description', statistics, userEmail: email })
    await newVideo.save()

    return { success: true, video: newVideo }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'Internal Server Error' }
  }
}

const listVideo = async () => {
  try {
    const listVideo = await Video.find()
    return { success: true, list: listVideo }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'Internal Server Error' }
  }
}

const videoService = {
  shareVideo,
  listVideo
}

export default videoService