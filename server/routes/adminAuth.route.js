import express from 'express'
import {signin,signout} from '../controllers/adminAuth.controller.js'
const router=express()

router.post('/signin',signin)
router.get('/signout',signout)
export default router