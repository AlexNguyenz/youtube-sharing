/* eslint-disable no-undef */

import { listVideo, shareVideo } from '../../../controllers/videoController'
import videoService from '../../../services/videoService'
import youtubeService from '../../../services/youtubeService'
import { getYouTubeVideoId } from '../../../utils/youtubeUtils'
import Video from '../../../models/videoModel'

jest.mock('../../../services/videoService')
jest.mock('../../../services/youtubeService')
jest.mock('../../../utils/youtubeUtils')


describe('videoController - listVideo', () => {
  it('should return a list of videos and 200 status if successful', async () => {
    const mockVideoList = [
      { id: 1, title: 'Video 1' },
      { id: 2, title: 'Video 2' }
    ]
    videoService.listVideo.mockResolvedValueOnce({ list: mockVideoList })

    const mReq = {}
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await listVideo(mReq, mRes)

    expect(mRes.status).toHaveBeenCalledWith(200)
    expect(mRes.json).toHaveBeenCalledWith({ list: mockVideoList })
  })

  it('should return 500 status and error message if an internal server error occurs', async () => {
    videoService.listVideo.mockRejectedValueOnce(new Error('Internal Server Error'))

    const mReq = {}
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await listVideo(mReq, mRes)

    expect(mRes.status).toHaveBeenCalledWith(500)
    expect(mRes.json).toHaveBeenCalledWith({ message: 'Internal Server Error' })
  })
})

describe('videoController - shareVideo', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return success true and the new video if sharing is successful', async () => {
    const mockUrl = 'https://www.youtube.com/watch?v=JY0OPwXPQ98'
    const mockSocketId = '123'
    const mockEmail = 'test@example.com'
    const mockVideoDetails = {
      title: 'Test Video',
      description: 'This is a test video'
    }

    const mReq = { body: { url: mockUrl, socketId: mockSocketId }, userData: { email: mockEmail } }

    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      io: {
        emit: jest.fn()
      }
    }

    getYouTubeVideoId.mockReturnValueOnce('JY0OPwXPQ98')
    videoService.shareVideo.mockResolvedValueOnce({
      success: true,
      video: { title: 'Video Title', viewCount: 1000, userEmail: mockEmail }
    })

    jest.spyOn(Video, 'findOne').mockResolvedValue(null)
    jest.spyOn(Video.prototype, 'save').mockResolvedValue({
      url: mockUrl,
      ...mockVideoDetails,
      userEmail: mockEmail
    })

    await shareVideo(mReq, mRes)

    expect(mRes.status).toHaveBeenCalledWith(201)
    expect(mRes.json).toHaveBeenCalledWith({
      video: {
        title: 'Video Title',
        viewCount: 1000,
        userEmail: mockEmail
      }
    })

    expect(mRes.io.emit).toHaveBeenCalledWith('notification', {
      title: 'Video Title',
      email: mockEmail,
      sender: mockSocketId
    })
  })

  it('should return success false and an error message if video already exists', async () => {
    const mockUrl = 'https://www.youtube.com/watch?v=JY0OPwXPQ98'
    const mockSocketId = '123'
    const mockEmail = 'test@example.com'

    const mReq = { body: { url: mockUrl, socketId: mockSocketId }, userData: { email: mockEmail } }

    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      io: {
        emit: jest.fn()
      }
    }

    getYouTubeVideoId.mockReturnValueOnce('JY0OPwXPQ98')
    videoService.shareVideo.mockResolvedValueOnce({
      success: false,
      message: 'Video already exists'
    })

    await shareVideo(mReq, mRes)

    expect(mRes.status).toHaveBeenCalledWith(400)
    expect(mRes.json).toHaveBeenCalledWith({
      message: 'Video already exists'
    })

    expect(mRes.io.emit).not.toHaveBeenCalled()
  })

  it('should return success false and an error message if an invalid url is provided', async () => {
    const mockUrl = 'https://www.youtube.com/watch?v=JY0OPwXPQ98'
    const mockSocketId = '123'
    const mockEmail = 'test@example.com'

    const mReq = { body: { url: mockUrl, socketId: mockSocketId }, userData: { email: mockEmail } }

    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      io: {
        emit: jest.fn()
      }
    }

    getYouTubeVideoId.mockReturnValueOnce(null)
    videoService.shareVideo.mockResolvedValueOnce({
      success: false, message: 'Invalid url'
    })

    await shareVideo(mReq, mRes)

    expect(mRes.status).toHaveBeenCalledWith(400)
    expect(mRes.json).toHaveBeenCalledWith({
      message: 'Invalid url'
    })

    expect(mRes.io.emit).not.toHaveBeenCalled()
  })

  it('should return success false and an error message if an url does not exist', async () => {
    const mockUrl = 'https://www.youtube.com/watch?v=JY0OPwXPQ98'
    const mockSocketId = '123'
    const mockEmail = 'test@example.com'

    const mReq = { body: { url: mockUrl, socketId: mockSocketId }, userData: { email: mockEmail } }

    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      io: {
        emit: jest.fn()
      }
    }

    getYouTubeVideoId.mockReturnValueOnce('JY0OPwXPQ98')
    youtubeService.getVideo.mockResolvedValueOnce({
      success: false, message: 'URL does not exist'
    })
    videoService.shareVideo.mockResolvedValueOnce({
      success: false, message: 'URL does not exist'
    })

    await shareVideo(mReq, mRes)

    expect(mRes.status).toHaveBeenCalledWith(400)
    expect(mRes.json).toHaveBeenCalledWith({
      message: 'URL does not exist'
    })

    expect(mRes.io.emit).not.toHaveBeenCalled()
  })

  it('should handle internal server error and return success false with a message', async () => {
    const mockUrl = 'https://www.youtube.com/watch?v=JY0OPwXPQ98'
    const mockSocketId = '123'
    const mockEmail = 'test@example.com'

    getYouTubeVideoId.mockReturnValueOnce('JY0OPwXPQ98')
    videoService.shareVideo.mockRejectedValueOnce(new Error('Internal Server Error'))
    const mReq = { body: { url: mockUrl, socketId: mockSocketId }, userData: { email: mockEmail } }
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      io: {
        emit: jest.fn()
      }
    }
    await shareVideo(mReq, mRes)

    expect(mRes.status).toHaveBeenCalledWith(500)
    expect(mRes.json).toHaveBeenCalledWith({
      message: 'Internal Server Error'
    })
  })
})