import express from "express";
import passport from "passport";
import authController from "../controllers/authController.js";

const auth = express.Router();

const authCheck = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // If the user is authenticated, redirect to the root route
        res.redirect('/auth/login');
    } else
    // If the user is not authenticated, proceed to the login route
    next();
}

const authCheckLogin = (req, res, next) => {
    if (req.isAuthenticated()) {
        // If the user is authenticated, redirect to the root route
        res.redirect('/');
    } else
    // If the user is not authenticated, proceed to the login route
    next();
}

auth.get('/', authCheck, authController.profile);
auth.get('/login', authCheckLogin, authController.login);
auth.get('/google', authController.google);
auth.get('/logout', authController.logout);
// callback route for google to redirect ot
auth.get('/google/redirect',passport.authenticate('google') ,authController.google_redirect);
// toggle user flag
auth.get('/update-flag', authController.updateFlag);


export default auth;