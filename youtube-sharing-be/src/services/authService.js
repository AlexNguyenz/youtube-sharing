import bcrypt from 'bcrypt'
import User from '../models/userModel.js'
import 'dotenv/config'
import { generateToken } from '../utils/generateToken.js'


const registerUser = async (email, password) => {
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return { success: false, message: 'User already exists' }
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = new User({ email, password: hashedPassword })
    await newUser.save()

    const token = generateToken(newUser)
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

    const token = generateToken({ userId: user._id, email: user.email })
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