import express from 'express'
import {test,updateUser,deleteUser,updatePassword} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router=express.Router()
console.log(verifyToken);
router.get('/',test)
router.post('/update/:id',verifyToken,updateUser)
router.delete('/delete/:id',verifyToken,deleteUser)
router.put('/updatePassword/:id',verifyToken,updatePassword)


export default router