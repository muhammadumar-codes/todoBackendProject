const bcrpytjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

// ===*Users And Registers From The Data File *===
const { users, registerUsers, loginUser } = require('../data/users')

const bcrypt = require('bcrypt')

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

  // ===*Validation*===
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

//===========================*REGISTER USERS *=========================
const registrationForm = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        isSuccess: false,
        message: 'All fields are Required ! ',
      })
    }

    // ===*CHECK THE EXIST USER*===

    const foundExistUser = registerUsers.find((item) => item.email === email)

    if (foundExistUser) {
      return res.status(409).json({
        isSuccess: false,
        message: 'User Already Exist',
      })
    }

    // ===*HASHED THE PASSWORD HERE*===

    const hashPassword = await bcrypt.hash(password, 10)

    // ===*NEW USERS*===

    const newUser = {
      id: users.length + 1,
      name,
      email,
      hashPassword,
    }

    registerUsers.push(newUser)

    res.status(201).json({
      isSuccess: true,
      message: 'User Created Successfully 🙈',
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.hashPassword,
      },
    })

    // ===*ERROR *===
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: 'Server Error 🥹',
    })
  }
}

//===========================*LOGIN USER *=========================
const loginForm = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        isSuccess: false,
        message: 'Email and Password are required',
      })
    }

    // find registered user
    const foundUser = registerUsers.find((item) => item.email === email)

    if (!foundUser) {
      return res.status(404).json({
        isSuccess: false,
        message: 'User not found',
      })
    }

    // compare password
    const isMatched = await bcrpytjs.compare(password, foundUser.hashPassword)

    if (!isMatched) {
      return res.status(401).json({
        isSuccess: false,
        message: 'Invalid password',
      })
    }

    // success
    res.status(200).json({
      isSuccess: true,
      message: 'Login successful',
      user: {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
      },
    })
  } catch (error) {
    res.status(500).json({
      isSuccess: false,
      message: 'Server error',
    })
  }
}

// ===*EXPORT CONTROLERS*===

module.exports = {
  allUsers,
  userById,
  createUser,
  updateUser,
  deleteUser,
  registrationForm,
  loginForm,
}
