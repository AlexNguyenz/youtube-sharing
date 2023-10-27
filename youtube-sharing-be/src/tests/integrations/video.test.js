/* eslint-disable no-undef */
import supertest from 'supertest'
import server from '../../server.js'
import 'dotenv/config'

const request = supertest(server)

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGdtYWlsLmNvbSIsImlhdCI6MTY5ODQyMzU5NH0.tTj56kg8uvFcGZJHR_jH7SAJbfJbqgTr9h-j9FQPNcU'

describe('GET /list', () => {
  test('should get list video successfully', async () => {
    const res = await request.get('/list')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body.list)).toBe(true)
  })
})

describe('POST /share', () => {
  const mockData= {
    url:'https://www.youtube.com/watch?v=olU5wIrtPB0',
    socketId: '123'
  }
  test('should share video successfully', async () => {
    const res = await request.post('/share').set('Authorization', `Bearer ${accessToken}`).send(mockData)
    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('video')
  })

  test('should share fail: without bearer token', async () => {
    const res = await request.post('/share').send(mockData)
    expect(res.statusCode).toBe(401)
    expect(res.body.message).toBe('Unauthorized')
  })

  test('should share fail: include token but don\'t include bearer', async () => {
    const res = await request.post('/share').set('Authorization', `${accessToken}`).send(mockData)
    expect(res.statusCode).toBe(401)
    expect(res.body.message).toBe('Unauthorized')
  })

  test('should share fail: invalid token', async () => {
    const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
    const res = await request.post('/share').set('Authorization', `${invalidToken}`).send(mockData)
    expect(res.statusCode).toBe(401)
    expect(res.body.message).toBe('Unauthorized')
  })

  test('should share fail: invalid url', async () => {
    const invalidUrl = {
      url:'https://www.google.com/',
      socketId: '123'
    }
    const res = await request.post('/share').set('Authorization', `Bearer ${accessToken}`).send(invalidUrl)
    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe('Invalid url')
  })

  test('should share fail: empty url', async () => {
    const emptyUrl = {
      url:'',
      socketId: '123'
    }
    const res = await request.post('/share').set('Authorization', `Bearer ${accessToken}`).send(emptyUrl)
    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe('Url field must not be empty')
  })

  test('should share fail: valid url but id invalid', async () => {
    const idInvalid = {
      url:'https://www.youtube.com/watch?v=olU5wIrtaBc',
      socketId: '123'
    }
    const res = await request.post('/share').set('Authorization', `Bearer ${accessToken}`).send(idInvalid)
    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe('URL does not exist')
  })

  test('should share fail: video already exits', async () => {
    const res = await request.post('/share').set('Authorization', `Bearer ${accessToken}`).send(mockData)
    expect(res.statusCode).toBe(400)
    expect(res.body.message).toBe('Video already exists')
  })
})