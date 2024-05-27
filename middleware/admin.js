function admin (req, res, next) {
    if(req.isAuthenticated() && req.user.is_admin) {
        return next()
    }
    return res.redirect('/')
}

export default admin