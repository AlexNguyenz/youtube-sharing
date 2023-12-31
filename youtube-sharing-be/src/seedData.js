import { connectDB } from './config/db.config.js'
import bcrypt from 'bcrypt'
import User from './models/userModel.js'
import Video from './models/videoModel.js'
import UserJson from './json/user.json' assert { type: "json" }
import VideoJson from './json/video.json' assert { type: "json" }
import 'dotenv/config'


const createVideo = async () => {
  const newVideo = new Video({ url:VideoJson.url, ...VideoJson, userEmail: VideoJson.userEmail })
  await newVideo.save()
}

const createUser = async () => {
  const hashedPassword = await bcrypt.hash(UserJson.password, 12)
  const newUser = new User({ email:UserJson.email, password: hashedPassword })
  await newUser.save()
}

const seedingData = async () => {
  try {
    await connectDB()
    await createUser()
    await createVideo()
  } catch (error) {
    console.log(error)
  } finally {
    process.exit()
  }
}

seedingData()

