import express from 'express'
import {test,updateAdmin,updateUser} from '../controllers/admin.controller.js'
import { verifyToken } from '../utils/verifyAdmin.js'

const router=express.Router()

router.get('/admin',test)
router.post('/update/:id',verifyToken,updateAdmin)
router.post('/updateUser/:id',verifyToken,updateUser)

export default router