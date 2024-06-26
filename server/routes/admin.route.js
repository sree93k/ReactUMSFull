import express from 'express'
import {test,updateAdmin,updateUser,allUsers,updateVerifiedStatus,editUser,updatePassword,deleteUser,createUser} from '../controllers/admin.controller.js'
import { verifyToken } from '../utils/verifyAdmin.js'

const router=express.Router()
console.log(verifyToken);
router.get('/admin',test)
router.get('/allUsers',verifyToken,allUsers)
router.post('/update/:id',verifyToken,updateAdmin)
router.post('/updateUser/:id',verifyToken,updateUser)
router.put('/updateVerifiedStatus/:id',verifyToken,updateVerifiedStatus)
router.get('/editUser/:id',verifyToken,editUser)
router.put('/updatePassword/:id',verifyToken,updatePassword)
router.delete('/deleteUser/:id',verifyToken,deleteUser)
router.post('/createUser',verifyToken,createUser)
export default router