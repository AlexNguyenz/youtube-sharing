/* eslint-disable no-undef */

import VideoServices from '../../../services/videoService'
import Video from '../../../models/videoModel'
import youtubeService from '../../../services/youtubeService'


describe('VideoServices - Get list video', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should list videos successfully', async () => {
    const mockVideos = [
      { title: 'Video 1', url: 'https://example.com/video1' },
      { title: 'Video 2', url: 'https://example.com/video2' }
    ]
    jest.spyOn(Video, 'find').mockResolvedValue(mockVideos)

    const result = await VideoServices.listVideo()

    expect(result.success).toBe(true)
    expect(result.list).toEqual(mockVideos)
  })

  it('should handle internal server error', async () => {
    jest.spyOn(Video, 'find').mockRejectedValue(new Error('Some internal error'))

    const result = await VideoServices.listVideo()

    expect(result.success).toBe(false)
    expect(result.message).toBe('Internal Server Error')
  })
})

describe('VideoService - Share Video', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should share a video successfully', async () => {
    const mockUrl = 'https://www.youtube.com/watch?v=JY0OPwXPQ98'
    const mockEmail = 'test@example.com'
    const mockVideoId = 'JY0OPwXPQ98'
    const mockVideoDetails = {
      title: 'Test Video',
      description: 'This is a test video'
    }

    jest.spyOn(youtubeService, 'getVideo').mockReturnValue(mockVideoId)

    jest.spyOn(Video, 'findOne').mockResolvedValue(null)

    jest.spyOn(youtubeService, 'getVideo').mockResolvedValue({
      success: true,
      video: mockVideoDetails
    })

    const saveMock = jest.spyOn(Video.prototype, 'save').mockResolvedValue({
      url: mockUrl,
      ...mockVideoDetails,
      userEmail: mockEmail
    })

    const result = await VideoServices.shareVideo(mockUrl, mockEmail)
    expect(result.success).toBe(true)
    expect(result.video.url).toEqual(mockUrl)
    expect(result.video.title).toEqual(mockVideoDetails.title)
    expect(result.video.description).toEqual(mockVideoDetails.description)

    expect(youtubeService.getVideo).toHaveBeenCalledWith(mockVideoId)
    expect(Video.findOne).toHaveBeenCalledWith({ id: mockVideoId })
    expect(youtubeService.getVideo).toHaveBeenCalledWith(mockVideoId)
    expect(Video.prototype.save).toHaveBeenCalledWith()

    jest.spyOn(youtubeService, 'getVideo').mockRestore()
    Video.findOne.mockRestore()
    saveMock.mockRestore()
  })

  it('should handle video already exists', async () => {
    jest.spyOn(Video, 'findOne').mockResolvedValue({
      _id: '12345',
      title: 'Existing Video',
      description: 'This is an existing video',
      userEmail: 'test@example.com'
    })

    const result = await VideoServices.shareVideo('https://example.com/existing-video', 'test@example.com')

    expect(result.success).toBe(false)
    expect(result.message).toBe('Video already exists')

    Video.findOne.mockRestore()
  })

  it('should handle does not exits url', async () => {
    const mockUrl = 'https://www.youtube.com/watch?v=JY0OPwXPQ98'
    const mockEmail = 'test@example.com'
    const mockVideoId = 'JY0OPwXPQ98'

    jest.spyOn(youtubeService, 'getVideo').mockReturnValue(mockVideoId)

    jest.spyOn(Video, 'findOne').mockResolvedValue(null)

    jest.spyOn(youtubeService, 'getVideo').mockResolvedValue({
      success: false,
      message: 'URL does not exist'
    })

    const result = await VideoServices.shareVideo(mockUrl, mockEmail)
    expect(result.success).toBe(false)
    expect(result.message).toBe('URL does not exist')

  })
})