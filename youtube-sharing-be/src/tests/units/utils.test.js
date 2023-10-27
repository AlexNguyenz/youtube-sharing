/* eslint-disable no-undef */
import jwt from 'jsonwebtoken'
import { generateToken } from '../../utils/generateToken'
import { getYouTubeVideoId } from '../../utils/youtubeUtils'
import 'dotenv/config'


describe('getYouTubeVideoId function', () => {
  test('should return the video ID when given a valid YouTube URL', () => {
    const validUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    const result = getYouTubeVideoId(validUrl)
    expect(result).toBe('dQw4w9WgXcQ')
  })

  test('should return null when given an invalid YouTube URL', () => {
    const invalidUrl = 'https://www.example.com'
    const result = getYouTubeVideoId(invalidUrl)
    expect(result).toBeNull()
  })

  test('should return null when given a non-YouTube URL', () => {
    const nonYouTubeUrl = 'https://www.vimeo.com/watch?v=12345'
    const result = getYouTubeVideoId(nonYouTubeUrl)
    expect(result).toBeNull()
  })
})


describe.only('generateToken function', () => {
  const mockUser = {
    _id: 'someUserId',
    email: 'user@example.com'
  }

  test('should generate a valid JWT token', () => {
    const secret = process.env.JWT_SECRET_KEY

    const token = generateToken(mockUser)
    const decoded = jwt.verify(token, secret)

    expect(decoded.userId).toBe(mockUser._id)
    expect(decoded.email).toBe(mockUser.email)
  })
})

