import { getYouTubeVideoId } from '../utils/youtubeUtils.js'

export const validateYoutubeURL = (url) => {
  const errors = {}

  if (!url.trim()) {
    errors.message = 'Url field must not be empty'
  } else {
    const idVideo = getYouTubeVideoId(url)
    if (!idVideo) {
      errors.message = 'Invalid url'

    }
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0
  }
}
