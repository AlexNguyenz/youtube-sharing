import bcrypt from 'bcrypt'
import User from '../models/userModel.js'
import authService from '../services/authService.js'
import { generateToken } from '../utils/generateToken.js'
import { validateAuth } from '../validators/authValidator.js'

export const register = async (req, res) => {
  try {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = new User({ email, password: hashedPassword })
    await newUser.save()

    const token = generateToken(newUser)

    res.status(201).json({ user: newUser, token })
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
      return res.status(400).json(errors)
    }

    const { token, user } = await authService.loginUser(email, password)
    res.status(201).json({ user: user, accessToken: token })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
