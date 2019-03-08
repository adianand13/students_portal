function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function isAdmin(req, res, next){
    if (req.isAuthenticated()){
        if (res.locals.currentUser.isAdmin){
            return next();
        }
    }
    res.redirect("/login");
}

function isStudent(req, res, next) {
    if (req.isAuthenticated()) {
        if (res.locals.currentUser.userType === "student") {
            return next();
        }
    }
    res.redirect("/error");
}

function isFaculty(req, res, next) {
    if (req.isAuthenticated()) {
        if (res.locals.currentUser.userType === "faculty") {
            return next();
        }
    }
    res.redirect("/login");
}
function isOrganiser(req, res, next) {
    if (req.isAuthenticated()) {
        if (res.locals.currentUser.userType === "organiser") {
            return next();
        }
    }
    res.redirect("/error");
}
function isPrincipal(req, res, next) {
    if (req.isAuthenticated()) {
        if (res.locals.currentUser.userType === "principal") {
            return next();
        }
    }
    res.redirect("/error");
}

module.exports = {
    isLoggedIn: isLoggedIn,
    isAdmin: isAdmin,
    isStudent: isStudent,
    isFaculty: isFaculty,
    isOrganiser: isOrganiser,
    isPrincipal: isPrincipal
};