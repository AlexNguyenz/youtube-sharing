import express from 'express'
import { shareVideo, listVideo } from '../controllers/videoController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/share', authMiddleware, shareVideo)
router.get('/list', listVideo)

export default router