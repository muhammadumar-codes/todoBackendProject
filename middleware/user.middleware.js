const authMiddleware = (req, res, next) => {
  console.log('This authMiddleware Has Runned')
  next()
}

module.exports = {
  authMiddleware,
}
