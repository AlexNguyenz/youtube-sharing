import videoService from '../services/videoService.js'

export const shareVideo = async (req, res) => {
  try {
    const { url } = req.body
    const { email } = req.userData

    const { video } = await videoService.shareVideo(url, email)
    res.status(201).json({ success:true, video })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const listVideo = async (req, res) => {
  try {
    const { list } = await videoService.listVideo()
    res.status(200).json({ success:true, list })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}