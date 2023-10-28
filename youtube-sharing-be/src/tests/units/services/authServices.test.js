/* eslint-disable no-undef */

import AuthServices from '../../../services/authService'
import User from '../../../models/userModel'
import bcrypt from 'bcrypt'


describe('AuthService - Register', () => {
  it('should register a new user', async () => {
    const findOneMock = jest.spyOn(User, 'findOne').mockResolvedValue(null)
    const saveMock = jest.spyOn(User.prototype, 'save').mockResolvedValue({
      _id: '12345',
      email: 'test@example.com'
    })

    const result = await AuthServices.registerUser('test@example.com', 'password123')

    expect(result.success).toBe(true)
    expect(result.user.email).toBe('test@example.com')
    expect(result.token).toBeDefined()

    findOneMock.mockRestore()
    saveMock.mockRestore()
  })

  it('should handle existing user', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue({ email: 'test@example.com' })

    const result = await AuthServices.registerUser('test@example.com', 'password123')

    expect(result.success).toBe(false)
    expect(result.message).toBe('User already exists')

    User.findOne.mockRestore()
  })
})

describe('AuthService - Login', () => {
  it('should log in a user successfully', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue({
      _id: '12345',
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 12)
    })

    const result = await AuthServices.loginUser('test@example.com', 'password123')

    expect(result.success).toBe(true)
    expect(result.user.email).toBe('test@example.com')
    expect(result.token).toBeDefined()
  })

  it('should handle user not found', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue(null)

    const result = await AuthServices.loginUser('test@example.com', 'password123')
    expect(result.success).toBe(false)
    expect(result.message).toBe('User not found')
  })

  it('should handle invalid credentials', async () => {
    jest.spyOn(User, 'findOne').mockResolvedValue({
      _id: '12345',
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 12)
    })

    const result = await AuthServices.loginUser('test@example.com', 'wrongpassword')

    expect(result.success).toBe(false)
    expect(result.message).toBe('Invalid credentials')
  })
})