const mongoose = require('mongoose')

// ===*USER SCHEMA*===
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('User', userSchema)
