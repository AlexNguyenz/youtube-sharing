/* eslint-disable no-undef */
import { validateAuth } from '../../../validators/authValidator'

describe('validateAuth', () => {
  it('should return errors for empty email and password', () => {
    const result = validateAuth('', '')
    expect(result).toEqual({
      errors: {
        email: 'Email field must not be empty',
        password: 'Password field must not be empty'
      },
      valid: false
    })
  })

  it('should return an error for invalid email', () => {
    const result = validateAuth('invalid-email', 'short')
    expect(result).toEqual({
      errors: {
        email: 'Invalid email address',
        password: 'Password must be at least 8 characters long'
      },
      valid: false
    })
  })

  it('should return an error for a short password', () => {
    const result = validateAuth('valid@email.com', 'short')
    expect(result).toEqual({
      errors: {
        password: 'Password must be at least 8 characters long'
      },
      valid: false
    })
  })

  it('should return no errors for valid email and password', () => {
    const result = validateAuth('valid@email.com', 'password123')
    expect(result).toEqual({
      errors: {},
      valid: true
    })
  })
})
