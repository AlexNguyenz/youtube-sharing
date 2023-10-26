import Video from '../models/videoModel.js'
import { getYouTubeVideoId } from '../utils/youtubeUtils.js'
import youtubeService from './youtubeService.js'


const shareVideo = async (url, email) => {
  try {
    const idVideo = getYouTubeVideoId(url)
    const existingUser = await Video.findOne({ id: idVideo })
    if (existingUser) {
      return { success: false, message: 'Video already exists' }
    }
    if (idVideo) {
      const { success, message, video } = await youtubeService.getVideo(idVideo)
      if (!success && message) return { success, message }
      if (video) {
        const newVideo = new Video({ url, ...video, userEmail: email })
        await newVideo.save()
        return { success: true, video: newVideo }
      }
    }
    return { success: false, message: 'Invalid url' }
  } catch (error) {
    console.error(error)
    if (error.status && error.message) {
      throw new Error(error)
    }
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