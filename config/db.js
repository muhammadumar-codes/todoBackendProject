// ===*IMPORT MONGOOSE*===
const mongoose = require('mongoose')

// ===*DATABASE CONNECTION FUNCTION*===
const DBURL = process.env.MONGO_URI

const connectDB = async () => {
  try {
    // ===*CONNECT TO MONGODB USING ENV VARIABLE*===

    await mongoose.connect(DBURL)

    console.log('MongoDB Connected Successfully')
  } catch (error) {
    // ===*ERROR HANDLING*===
    console.error(`MongoDB Connection Failed ${error.message}`)

    // ===*STOP SERVER IF DB FAILS*===
    process.exit(1)
  }
}

// ===*EXPORT DATABASE FUNCTION*===
module.exports = connectDB
