const express = require('express')
const router = express.Router()

// imported from the user.controller
const {
  allUsers,
  userById,
  createUser,
  updateUser,
  deleteUser,
  registrationForm,
} = require('../controllers/userController')

const { authMiddleware } = require('../middleware/user.middleware')

// ===*PUBLIC ROUTE*===

router.get('/', allUsers)

// ===*PROTECTED ROUTE*===

// GET USER BY ID

router.get('/:id', authMiddleware, userById)

//CREATE USER
router.post('/', authMiddleware, createUser)

// REGISTER USER
router.post('/register', authMiddleware, registrationForm)

//UPDATE USER
router.put('/:id', authMiddleware, updateUser)

// DELETE USER
router.delete('/:id', authMiddleware, deleteUser)

module.exports = router
