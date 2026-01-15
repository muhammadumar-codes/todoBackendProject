const express = require('express')
const router = express.Router()

const {
  allUsers,
  userById,
  createUser,
  updateUser,
  loginForm,
  deleteUser,
  registrationForm,
} = require('../controllers/userController')

//===========================*MIDDLE WARE*=========================
const authMiddleware = require('../middleware/user.middleware')

//===========================*PUBLIC ROUTE*=========================

// REGISTER
router.post('/register', registrationForm)

// LOGIN
router.post('/login', loginForm)

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
