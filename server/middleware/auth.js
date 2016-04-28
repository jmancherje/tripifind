module.exports = {
  isLoggedIn: function(req, res, next) {
    // 401 'unauthorized' should trigger the log-in modal
    console.log('login route')
    res.sendStatus(401)
  }
}