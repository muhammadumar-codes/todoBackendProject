const express = require('express')
const router = express.Router()

const {
  allUsers,
  userById,
  createUser,
  updateUser,
loginUser,
registerUser,
  deleteUser,
  
} = require('../controllers/userController')

//===========================*MIDDLE WARE*=========================
const authMiddleware = require('../middleware/user.middleware')

//===========================*PUBLIC ROUTE*=========================

// REGISTER
router.post('/register', registerUser)

// LOGIN
router.post('/login', loginUser)

// GET ALL USERS
router.get('/', allUsers)

//===========================*PROTECTED ROUTE *=========================

// GET USER BY ID
router.get('/:id', authMiddleware, userById)

// CREATE USER
router.post('/', authMiddleware, createUser)

// UPDATE USER
router.put('/:id', authMiddleware, updateUser)

// DELETE USER
router.delete('/:id', authMiddleware, deleteUser)

//===========================*EXPORT ROUTER *=========================
module.exports = router
