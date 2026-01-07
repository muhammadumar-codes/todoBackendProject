const authMiddleware = (req, res, next) => {
  console.log('THE MIDDLE WARE IS RUNNED !')

  next()
}

module.exports = {
  authMiddleware,
}
