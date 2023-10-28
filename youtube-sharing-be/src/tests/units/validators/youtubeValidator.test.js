/* eslint-disable no-undef */
import { validateYoutubeURL } from '../../../validators/youtubeValidator'

describe('validateYoutubeURL', () => {
  it('should return an error for empty URL', () => {
    const result = validateYoutubeURL('')
    expect(result).toEqual({
      errors: {
        message: 'Url field must not be empty'
      },
      valid: false
    })
  })

  it('should return an error for invalid YouTube URL', () => {
    const result = validateYoutubeURL('https://example.com/not-a-youtube-video')
    expect(result).toEqual({
      errors: {
        message: 'Invalid url'
      },
      valid: false
    })
  })

  it('should return no errors for valid YouTube URL', () => {
    const result = validateYoutubeURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    expect(result).toEqual({
      errors: {},
      valid: true
    })
  })
})
