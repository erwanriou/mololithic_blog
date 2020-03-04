module.exports = (req, res, next) => {
  if (req.user.authorities.includes("ROLE_ADMIN") === false) {
    return res.status(403).json({
      error: "You doesnt have admin rights"
    })
  }
  next()
}
