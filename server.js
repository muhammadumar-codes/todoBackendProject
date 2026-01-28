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
// Parse incoming JSON data
app.use(express.json())

// ===*ROUTES*===
// User routes
app.use('/', userRoutes)
connectDB()

// ===*CONNECT DATABASE*===

// ===*START SERVER*===
// it not works in prod with vercel
// app.listen(PORT, () => {
//   console.log(` Server running on port ${PORT}`)
// })

// this is for prod deploy in vercel
module.exports = app;
