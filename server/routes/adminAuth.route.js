import express from 'express'
import {signin,signout} from '../controllers/adminAduth.controller.js'
const router=express()

router.post('/signin',signin)
router.get('/signout',signout)
export default router