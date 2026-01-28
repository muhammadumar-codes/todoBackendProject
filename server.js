// ===*IMPORT ENV VARIABLES*===
require('dotenv').config()

// ===*IMPORT PACKAGES*===
const express = require('express')

// ===*IMPORT DATABASE CONNECTION*===
const connectDB = require('./config/db.js')

// ===*IMPORT ROUTES*===
const userRoutes = require('./routes/user.Routes')

// ===*INITIALIZE EXPRESS APP*===
const app = express()

// ===*DEFINE PORT*===
const PORT = process.env.PORT || 5000

// ===*MIDDLEWARE*===
app.use(express.json())

// ===*CONNECT DATABASE*===
connectDB()

// ===*ROUTES*===
app.use('/', userRoutes)

// ===*START SERVER*===
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
