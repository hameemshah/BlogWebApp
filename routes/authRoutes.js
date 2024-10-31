import express from "express";
import passport from "passport";
import authController from "../controllers/authController.js";

const auth = express.Router();

const authCheck = (req, res, next) => {
    if (req.isAuthenticated()) {
        // If the user is authenticated, redirect to the root route
        res.redirect('/auth');
    } 
    // proceed to the login route
    next();
}

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(401).send("Unauthorized");
}

auth.get('/', authController.profile);
// get login page
auth.get('/login', authCheck, authController.login);
// log user in or sign them up
auth.post('/login', passport.authenticate('local'), authController.login_post);
auth.get('/google', authController.google);
auth.get('/logout', authController.logout);
// callback route for google to redirect ot
auth.get('/google/redirect',passport.authenticate('google') ,authController.google_redirect);
// toggle user flag
auth.get('/update-flag', authController.updateFlag);
// delete the user
auth.get('/deleteUser/:user_id', authController.delUser);
// User delete themselves
auth.get('/userDelete/:user_id', authController.userDelete);
// User updates themselves
auth.post('/userUpdate', ensureAuthenticated, authController.userUpdate);
export default auth;