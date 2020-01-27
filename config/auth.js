
module.exports = {
    auth: (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'Please login to view this page');
        res.redirect('/user/login');
    }
}