// =====================================
// User Controller (Business Logic Layer)
// =====================================

const users = require('../data/users')

// -------------------------------------
// GET: All Users
// -------------------------------------
const allUsers = (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  })
}

// -------------------------------------
// GET: Single User by ID
// -------------------------------------
const userById = (req, res) => {
  const id = Number(req.params.id)

  const user = users.find((item) => item.id === id)

  // If user not found
  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    })
  }

  res.status(200).json({
    success: true,
    data: user,
  })
}

// POST: Create New User

const createUser = (req, res) => {
  const { name, brand } = req.body

  // Validation
  if (!name || !brand) {
    return res.status(400).json({
      success: false,
      message: 'Name and brand are required',
    })
  }

  const newUser = {
    id: users.length + 1,
    name,
    brand,
  }

  users.push(newUser)

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: newUser,
  })
}

// PUT: Update Existing User

const updateUser = (req, res) => {
  const id = Number(req.params.id)
  const { name, brand } = req.body

  const user = users.find((item) => item.id === id)

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    })
  }

  // Update only if values are provided
  user.name = name || user.name
  user.brand = brand || user.brand

  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: user,
  })
}

// DELETE: Remove User

const deleteUser = (req, res) => {
  const id = Number(req.params.id)

  const index = users.findIndex((u) => u.id === id)

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
    })
  }

  const deletedUser = users.splice(index, 1)

  res.status(200).json({
    success: true,
    message: 'User deleted successfully',
    data: deletedUser[0],
  })
}

// Export Controllers

module.exports = {
  allUsers,
  userById,
  createUser,
  updateUser,
  deleteUser,
}
