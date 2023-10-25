import { REGEX } from '../constants/regex.js'

export function getYouTubeVideoId(url) {
  const regex = REGEX.YOUTUBE_URL
  const match = url.match(regex)

  if (match) {
    return match[4]
  } else {
    return null
  }
}

export function convertResponseYoutube (data) {
  const { title, description } = data.snippet

  const { viewCount = '0', likeCount = '0', dislikeCount = '0', favoriteCount = '0', commentCount = '0' } = data.statistics
  const newData = {
    id:data.id,
    title,
    description,
    statistics: {
      viewCount,
      likeCount,
      dislikeCount,
      favoriteCount,
      commentCount
    }
  }
  return newData
}