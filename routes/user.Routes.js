const express = require('express')
const router = express.Router()

// Import controller functions
const {
  allUsers,
  userById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController')

router.get('/', allUsers)

router.get('/:id', userById)

router.post('/', createUser)

router.put('/:id', updateUser)

router.delete('/:id', deleteUser)

module.exports = router
