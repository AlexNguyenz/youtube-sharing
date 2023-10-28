/* eslint-disable no-undef */

import { authMiddleware } from '../../../middlewares/authMiddleware'
import jwt from 'jsonwebtoken'

describe('authMiddleware', () => {
  let req, res, next

  beforeEach(() => {
    req = {
      headers: {}
    }
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    next = jest.fn()
  })

  it('should return 401 if no token is provided', () => {
    authMiddleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' })
    expect(next).not.toHaveBeenCalled()
  })

  it('should return 401 if token format is incorrect', () => {
    req.headers.authorization = 'InvalidTokenFormat'

    authMiddleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' })
    expect(next).not.toHaveBeenCalled()
  })

  it('should return 401 if token is invalid', () => {
    req.headers.authorization = 'Bearer InvalidToken'

    authMiddleware(req, res, next)

    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' })
    expect(next).not.toHaveBeenCalled()
  })

  it('should set req.userData and call next if token is valid', () => {
    const validToken = 'Bearer validToken123'
    const decodedToken = { userId: '12345', email: 'test@example.com' }
    req.headers.authorization = validToken

    jest.spyOn(jwt, 'verify').mockReturnValue(decodedToken)
    authMiddleware(req, res, next)

    expect(req.userData).toEqual(decodedToken)
    expect(next).toHaveBeenCalled()

    jest.spyOn(jwt, 'verify').mockRestore()
  })
})
