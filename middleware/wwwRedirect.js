module.exports = (req, res, next) => {
  const host = req.get("Host")
  if (!req.headers.host.match(/^www/) && !host.match(/.herokuapp/))
    res.redirect(301, "https://www." + req.headers.host + req.url)
  else next()
}
