import videoService from '../services/videoService.js'
import { validateYoutubeURL } from '../validators/youtubeValidator.js'

export const shareVideo = async (req, res) => {
  try {
    const { url, socketId } = req.body
    const { email } = req.userData
    const { errors, valid } = validateYoutubeURL(url)
    if (!valid) {
      return res.status(400).json(errors)
    }
    const { success, message, video } = await videoService.shareVideo(url, email)
    if (!success) {
      return res.status(400).json({ message })
    }
    const io = res.io
    const notification = {
      title: video.title,
      email: video.userEmail,
      sender: socketId
    }
    io.emit('notification', notification)
    return res.status(201).json({ video })

  } catch (error) {
    console.log({ error })
    if (error.status && error.message) {
      return res.status(error.status).json({ message: error.message })
    }
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const listVideo = async (req, res) => {
  try {
    const { list } = await videoService.listVideo()
    res.status(200).json({ list })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}