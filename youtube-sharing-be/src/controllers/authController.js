import authService from '../services/authService.js'
import { validateAuth } from '../validators/authValidator.js'

export const register = async (req, res) => {
  try {
    const { email, password } = req.body
    const { success, message, user, token } = await authService.registerUser(email, password)
    if (!success) {
      return res.status(400).json({ message })
    }
    return res.status(201).json({ user: user, accessToken: token })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const { errors, valid } = validateAuth(email, password)
    if (!valid) {
      return res.status(400).json({ message : errors.email || email.password })
    }

    const { success, message, token, user } = await authService.loginUser(email, password)
    if (!success) {
      return res.status(403).json({ message })
    }
    return res.status(200).json({ user: { _id: user._id, email: user.email }, accessToken: token })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
