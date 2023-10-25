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


    res.status(201).json({ user: { _id: newUser._id, email: newUser.email }, accessToken: token })
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
