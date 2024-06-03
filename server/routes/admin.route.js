import express from 'express'
import {test,updateAdmin,updateUser,allUsers,updateVerifiedStatus} from '../controllers/admin.controller.js'
import { verifyToken } from '../utils/verifyAdmin.js'

const router=express.Router()

router.get('/admin',test)
router.get('/allUsers',verifyToken,allUsers)
router.post('/update/:id',verifyToken,updateAdmin)
router.post('/updateUser/:id',verifyToken,updateUser)
router.put('/updateVerifiedStatus/:id',verifyToken,updateVerifiedStatus)

export default router