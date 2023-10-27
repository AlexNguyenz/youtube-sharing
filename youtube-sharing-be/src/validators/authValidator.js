import { REGEX } from '../constants/regex.js'

export const validateAuth = (email, password) => {
  const errors = {}

  if (!email.trim()) {
    errors.email = 'Email field must not be empty'
  } else if (!email.match(REGEX.EMAIL)) {
    errors.email = 'Invalid email address'
  }

  if (!password.trim()) {
    errors.password = 'Password field must not be empty'
  } else if (password.trim().length < REGEX.PASSWORD) {
    errors.password = 'Password must be at least 8 characters long'
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0
  }
}
