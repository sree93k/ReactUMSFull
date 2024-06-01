import express from 'express'
import {test,updateAdmin} from '../controllers/admin.controller.js'
import { verifyToken } from '../utils/verifyAdmin.js'

const router=express.Router()

router.get('/admin',test)
router.post('/update/:id',verifyToken,updateAdmin)

export default router