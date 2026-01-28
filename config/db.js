const mongoose = require('mongoose')

async function connectDB() {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://admin:umarkhan@cluster0.jooac0p.mongodb.net/?appName=Cluster0',
    )
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  }
}

module.exports = connectDB
