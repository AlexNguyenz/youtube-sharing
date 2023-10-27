/* eslint-disable no-undef */
const io = require('socket.io-client')
const http = require('http')
const ioBack = require('socket.io')

let socket
let httpServer
let httpServerAddr
let ioServer

/**
 * Setup WS & HTTP servers
 */
beforeAll((done) => {
  httpServer = http.createServer().listen()
  httpServerAddr = httpServer.address()
  ioServer = ioBack(httpServer)
  done()
})

/**
 *  Cleanup WS & HTTP servers
 */
afterAll((done) => {
  ioServer.close()
  httpServer.close()
  done()
})

/**
 * Run before each test
 */
beforeEach((done) => {
  // Setup
  // Do not hardcode server port and address, square brackets are used for IPv6
  socket = io.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    transports: ['websocket']
  })
  socket.on('connect', () => {
    done()
  })
})

/**
 * Run after each test
 */
afterEach((done) => {
  // Cleanup
  if (socket && socket.connected) {
    socket.disconnect()
  }
  done()
})


describe('basic socket.io example', () => {
  test('should communicate', (done) => {
    // once connected, emit Hello World
    ioServer.emit('echo', 'Hello World')
    socket.once('echo', (message) => {
      // Check that the message matches
      expect(message).toBe('Hello World')
      done()
    })
    ioServer.on('connection', (mySocket) => {
      expect(mySocket).toBeDefined()
    })
  })
  test('should notification event', (done) => {
    const notification = {
      title: 'title',
      email: 'email',
      sender: 'sender'
    }
    ioServer.emit('notification', notification)
    socket.once('notification', (message) => {
      // Check that the message matches
      expect(message.title).toBe('title')
      expect(message.email).toBe('email')
      expect(message.sender).toBe('sender')
      done()
    })
  })
})


