// users
const users = require('../data/users')

// All Users
const allUsers = (req, res) => {
  res.json({ isSuccess: true, data: users })
}

// userDetails userByid
const userById = (req, res) => {
  const id = Number(req.params.id)

  const user = users.find((item) => item.id === id)

  if (!user) {
    return res.status(404).send({ isSuccess: false, message: 'user not Found' })
  }

  res.json({ isSuccess: true, user })
}

// Exporting
module.exports = {
  allUsers,
  userById,
}
