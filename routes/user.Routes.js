const express = require('express')
const router = express.Router()

// imported from the user.controller
const {
  allUsers,
  userById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController')

const { authMiddleware } = require('../middleware/user.middleware')

// private route

router.get('/', allUsers)

//  protected route
router.get('/:id', authMiddleware, userById)
router.post('/', authMiddleware, createUser)
router.put('/:id', authMiddleware, updateUser)
router.delete('/:id', authMiddleware, deleteUser)

module.exports = router
