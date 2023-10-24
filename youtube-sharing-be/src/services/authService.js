import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import 'dotenv/config'

const secret = process.env.JWT_SECRET_KEY

const registerUser = async (email, password) => {
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return { success: false, message: 'User already exists' }
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = new User({ email, password: hashedPassword })
    await newUser.save()

    const token = jwt.sign({ userId: newUser._id, email: newUser.email }, secret, { expiresIn: '1h' })

    return { success: true, user: newUser, token }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'Internal Server Error' }
  }
}

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return { success: false, message: 'User not found' }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return { success: false, message: 'Invalid credentials' }
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, secret)

    return { success: true, user, token }
  } catch (error) {
    console.error(error)
    return { success: false, message: 'Internal Server Error' }
  }
}

const authService = {
  registerUser,
  loginUser
}

export default authService