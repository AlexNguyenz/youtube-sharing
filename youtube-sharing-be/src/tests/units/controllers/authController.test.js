/* eslint-disable no-undef */

import { register, login } from '../../../controllers/authController'
import authService from '../../../services/authService'

jest.mock('../../../services/authService')

describe('authController - register', () => {
  it('should return 400 status and error message if email empty', async () => {
    const mReq = { body: { email: '', password: 'short' } }
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await register(mReq, mRes)

    expect(mRes.status).toHaveBeenCalledWith(400)
    expect(mRes.json).toHaveBeenCalledWith({ message: 'Email field must not be empty' })
  })

  it('should return 400 status and error message if password invalid', async () => {
    const mReq = { body: { email: 'test@gmail.com', password: 'short' } }
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await register(mReq, mRes)

    expect(mRes.status).toHaveBeenCalledWith(400)
    expect(mRes.json).toHaveBeenCalledWith({ message: 'Password must be at least 8 characters long' })
  })

  it('should return 400 status and error message if password empty', async () => {
    const mReq = { body: { email: 'test@gmail.com', password: '' } }
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await register(mReq, mRes)

    expect(mRes.status).toHaveBeenCalledWith(400)
    expect(mRes.json).toHaveBeenCalledWith({ message: 'Password field must not be empty' })
  })

  it('should return 400 status and error message if email and password invalid', async () => {
    const mReq = { body: { email: 'invalid_email', password: 'short' } }
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await register(mReq, mRes)

    expect(mRes.status).toHaveBeenCalledWith(400)
    expect(mRes.json).toHaveBeenCalledWith({ message: 'Invalid email address' })
  })

  it('should return 400 status and error message if password and error empty', async () => {
    const mReq = { body: { email: '', password: '' } }
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await register(mReq, mRes)

    expect(mRes.status).toHaveBeenCalledWith(400)
    expect(mRes.json).toHaveBeenCalledWith({ message: 'Email field must not be empty' })
  })

  it('should return 201 status and user details with token if registration succeeds', async () => {
    authService.registerUser.mockResolvedValueOnce({ success: true, user: { id: 1, email: 'test@example.com' }, token: 'accessToken' })

    const mReq = { body: { email: 'test@example.com', password: 'password123' } }
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await register(mReq, mRes)

    expect(mRes.status).toHaveBeenCalledWith(201)
    expect(mRes.json).toHaveBeenCalledWith({
      user: { id: 1, email: 'test@example.com' },
      accessToken: 'accessToken'
    })
  })

  it('should return 500 status and error message if an internal server error occurs', async () => {
    authService.registerUser.mockRejectedValueOnce(new Error('Internal Server Error'))

    const mReq = { body: { email: 'test@example.com', password: 'password123' } }
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await register(mReq, mRes)

    expect(mRes.status).toHaveBeenCalledWith(500)
    expect(mRes.json).toHaveBeenCalledWith({ message: 'Internal Server Error' })
  })
})


describe.only('authController - login', () => {
  it('should return 400 status and error message if email empty', async () => {
    const mReq = { body: { email: '', password: 'short' } }
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await register(mReq, mRes)

    expect(mRes.status).toHaveBeenCalledWith(400)
    expect(mRes.json).toHaveBeenCalledWith({ message: 'Email field must not be empty' })
  })

  it('should return 400 status and error message if password invalid', async () => {
    const mReq = { body: { email: 'test@gmail.com', password: 'short' } }
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await register(mReq, mRes)

    expect(mRes.status).toHaveBeenCalledWith(400)
    expect(mRes.json).toHaveBeenCalledWith({ message: 'Password must be at least 8 characters long' })
  })

  it('should return 400 status and error message if password empty', async () => {
    const mReq = { body: { email: 'test@gmail.com', password: '' } }
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await register(mReq, mRes)

    expect(mRes.status).toHaveBeenCalledWith(400)
    expect(mRes.json).toHaveBeenCalledWith({ message: 'Password field must not be empty' })
  })

  it('should return 400 status and error message if email and password invalid', async () => {
    const mReq = { body: { email: 'invalid_email', password: 'short' } }
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await register(mReq, mRes)

    expect(mRes.status).toHaveBeenCalledWith(400)
    expect(mRes.json).toHaveBeenCalledWith({ message: 'Invalid email address' })
  })

  it('should return 400 status and error message if password and error empty', async () => {
    const mReq = { body: { email: '', password: '' } }
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await register(mReq, mRes)

    expect(mRes.status).toHaveBeenCalledWith(400)
    expect(mRes.json).toHaveBeenCalledWith({ message: 'Email field must not be empty' })
  })

  it('should return 500 status and error message if an internal server error occurs', async () => {
    authService.loginUser.mockRejectedValueOnce(new Error('Internal Server Error'))

    const mReq = { body: { email: 'valid_email@example.com', password: 'password123' } }
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await login(mReq, mRes)

    expect(mRes.status).toHaveBeenCalledWith(500)
    expect(mRes.json).toHaveBeenCalledWith({ message: 'Internal Server Error' })
  })

  it('should return 200 status and user details with token if login succeeds', async () => {
    authService.loginUser.mockResolvedValueOnce({
      success: true,
      user: { _id: 1, email: 'test@example.com' },
      token: 'accessToken'
    })

    const mReq = { body: { email: 'test@example.com', password: 'password123' } }
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    await login(mReq, mRes)

    expect(mRes.status).toHaveBeenCalledWith(200)
    expect(mRes.json).toHaveBeenCalledWith({
      user: { _id: 1, email: 'test@example.com' },
      accessToken: 'accessToken'
    })
  })
})

