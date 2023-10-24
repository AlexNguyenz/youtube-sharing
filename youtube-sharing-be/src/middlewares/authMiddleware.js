import jwt from 'jsonwebtoken'
import 'dotenv/config'

const secret = process.env.JWT_SECRET_KEY

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  const tokenSplit = token.split(' ')

  if (tokenSplit[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  try {
    const decodedToken = jwt.verify(tokenSplit[1], secret)
    req.userData = { userId: decodedToken.userId, email: decodedToken.email }
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}
