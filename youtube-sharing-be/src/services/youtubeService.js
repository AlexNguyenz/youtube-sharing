import 'dotenv/config'
import { convertResponseYoutube } from '../utils/youtubeUtils.js'

const API_KEY_YOUTUBE = process.env.API_KEY_YOUTUBE

const getVideo = async (id) => {
  try {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${API_KEY_YOUTUBE}`)
    const data = await response.json()
    if (!data.items.length) {
      return { success: false, message: 'URL does not exist' }
    }
    const newData = convertResponseYoutube(data.items[0])
    return { video: newData }
  } catch (error) {
    throw new Error(error)
  }
}

const youtubeService = {
  getVideo
}

export default youtubeService