const express = require('express')
const app = express()

// Server Port
const PORT = 5000

app.use(express.json())

const userRoutes = require('./routes/user.Routes')

app.use('/users', userRoutes)

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is running 🚀',
  })
})

app.listen(PORT, () => {
  console.log(`Server is listening on port  ${PORT} ❤️`)
})
