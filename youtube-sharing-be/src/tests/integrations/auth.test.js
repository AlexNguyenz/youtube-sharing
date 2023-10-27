import supertest from 'supertest'
import server from '../../server.js'
import 'dotenv/config'

const request = supertest(server)

describe('POST /register', () => {
  test('should register successfully', async () => {
    const newUser = {
      email:'user1@gmail.com',
      password:'123123123'
    }
    const res = await request.post('/register').send(newUser)
    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('user')
    expect(res.body).toHaveProperty('accessToken')
  })

  test('should register fail: Invalid email address', async () => {
    const newUser = {
      email:'user1',
      password:'123123123'
    }
    const res = await request.post('/register').send(newUser)
    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe('Invalid email address')
  })

  test('should register fail: Email field must not be empty', async () => {
    const newUser = {
      email:'',
      password:'123123123'
    }
    const res = await request.post('/register').send(newUser)
    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe('Email field must not be empty')
  })

  test('should register fail: Password field must not be empty', async () => {
    const newUser = {
      email:'user1@gmail.com',
      password:''
    }
    const res = await request.post('/register').send(newUser)
    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe('Password field must not be empty')
  })

  test('should register fail: Password must be at least 8 characters long', async () => {
    const newUser = {
      email:'user1@gmail.com',
      password:'123123'
    }
    const res = await request.post('/register').send(newUser)
    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe('Password must be at least 8 characters long')
  })

  test('should register fail: Both user and password invalid', async () => {
    const newUser = {
      email:'user1',
      password:'123123'
    }
    const res = await request.post('/register').send(newUser)
    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe('Invalid email address')
  })

  test('should register fail: Both user and password empty', async () => {
    const newUser = {
      email:'',
      password:''
    }
    const res = await request.post('/register').send(newUser)
    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe('Email field must not be empty')
  })

  test('should register fail: User already exists', async () => {
    const newUser = {
      email:'user1@gmail.com',
      password:'123123123'
    }
    const res = await request.post('/register').send(newUser)
    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe('User already exists')
  })
})

describe('POST /login', () => {
  test('should login successfully', async () => {
    const newUser = {
      email:'user1@gmail.com',
      password:'123123123'
    }
    const res = await request.post('/login').send(newUser)
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('user')
    expect(res.body).toHaveProperty('accessToken')
  })

  test('should login fail: Invalid email address', async () => {
    const newUser = {
      email:'user1',
      password:'123123123'
    }
    const res = await request.post('/login').send(newUser)
    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe('Invalid email address')
  })

  test('should login fail: Email field must not be empty', async () => {
    const newUser = {
      email:'',
      password:'123123123'
    }
    const res = await request.post('/login').send(newUser)
    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe('Email field must not be empty')
  })

  test('should login fail: Password field must not be empty', async () => {
    const newUser = {
      email:'user1@gmail.com',
      password:''
    }
    const res = await request.post('/login').send(newUser)
    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe('Password field must not be empty')
  })

  test('should login fail: Password must be at least 8 characters long', async () => {
    const newUser = {
      email:'user1@gmail.com',
      password:'123123'
    }
    const res = await request.post('/login').send(newUser)
    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe('Password must be at least 8 characters long')
  })

  test('should login fail: Both user and password invalid', async () => {
    const newUser = {
      email:'user1',
      password:'123123'
    }
    const res = await request.post('/login').send(newUser)
    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe('Invalid email address')
  })

  test('should login fail: Both user and password empty', async () => {
    const newUser = {
      email:'',
      password:''
    }
    const res = await request.post('/login').send(newUser)
    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe('Email field must not be empty')
  })

  test('should register fail: User not found', async () => {
    const newUser = {
      email:'user12@gmail.com',
      password:'123123123'
    }
    const res = await request.post('/login').send(newUser)
    expect(res.statusCode).toBe(403)
    expect(res.body.message).toBe('User not found')
  })

  test('should register fail: Invalid credentials', async () => {
    const newUser = {
      email:'user1@gmail.com',
      password:'123123123123'
    }
    const res = await request.post('/login').send(newUser)
    expect(res.statusCode).toBe(403)
    expect(res.body.message).toBe('Invalid credentials')
  })
})
