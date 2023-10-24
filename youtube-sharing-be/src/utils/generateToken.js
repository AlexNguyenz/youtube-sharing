import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET_KEY

export const generateToken = (user) => {
  return jwt.sign({ userId: user._id, email: user.email }, secret)
}

