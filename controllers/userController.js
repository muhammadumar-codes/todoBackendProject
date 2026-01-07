const users = require('../data/users')

// ===*GET ALL USERS*===

const allUsers = (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  })
}

// ===*SINGLE USER BY ID*===

const userById = (req, res) => {
  const id = Number(req.params.id)

  const user = users.find((item) => item.id === id)

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

// ===*CREATE A NEW USER*===

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

// ===*UPDATE EXIST USER*===

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

  // ===*UPDATE ONLY IF VALUE IS PROVIDED*===

  user.name = name || user.name
  user.brand = brand || user.brand

  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: user,
  })
}

// ===*REMVOE USER*===

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

// ===*REGISTER USER*===

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      res.status(400).json({
        isSuccess: false,
      })
    }
  } catch (error) {}
}

// ===*EXPORT CONTROLERS*===

module.exports = {
  allUsers,
  userById,
  createUser,
  updateUser,
  deleteUser,
  registerUser,
}
