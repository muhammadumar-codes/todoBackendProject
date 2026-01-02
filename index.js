const express = require('express')
const app = express()

const Port = 5000

app.use(express.json())

const userRoute = require('./routes/user.Routes')

app.use('/users', userRoute)

// Backend is Running
app.get('/', (req, res) => {
  res.json({ isSuccess: true, message: 'Backend is Running ' })
})

// Listening
app.listen(Port, () => {
  console.log(`Server is Listening on The ${Port}`)
})
