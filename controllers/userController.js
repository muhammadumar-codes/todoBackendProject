const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model.js')

// =========================*GET ALL USERS*=========================
const allUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')

    res.status(200).json({
      success: true,
      data: users,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    })
  }
}

// =========================*GET USER BY ID*=========================
const userById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')

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
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid user ID',
    })
  }
}

// =========================*CREATE USER*=========================
const createUser = async (req, res) => {
  try {
    const { name, brand } = req.body

    if (!name || !brand) {
      return res.status(400).json({
        success: false,
        message: 'Name and brand are required',
      })
    }

    const newUser = await User.create({ name, brand })

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    })
  }
}

// =========================*UPDATE USER*=========================
const updateUser = async (req, res) => {
  try {
    const { name, brand } = req.body

    const user = await User.findById(req.params.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    user.name = name || user.name
    user.brand = brand || user.brand

    await user.save()

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid ID',
    })
  }
}

// =========================*DELETE USER*=========================
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: user,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid ID',
    })
  }
}

// =========================*REGISTER USER*=========================
const registrationForm = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      })
    }

    const existUser = await User.findOne({ email })

    if (existUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    })
  }
}

// =========================*LOGIN USER*=========================
const loginForm = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password required',
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      })
    }

    const isMatched = await bcrypt.compare(password, user.password)

    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password',
      })
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    )

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    })
  }
}

// =========================*EXPORTS*=========================
module.exports = {
  allUsers,
  userById,
  createUser,
  updateUser,
  deleteUser,
  registrationForm,
  loginForm,
}
