require('dotenv').config()

const express = require('express')
const app = express()

const PORT = 5000

app.use(express.json())

const userRoutes = require('./routes/user.Routes')

app.use('/', userRoutes)

app.listen(PORT, () => {
  console.log(`Server is listening on port  ${PORT} ❤️`)
})
