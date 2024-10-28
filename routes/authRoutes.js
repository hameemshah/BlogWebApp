import express from "express";
import passport from "passport";
import authController from "../controllers/authController.js";

const auth = express.Router();

const authCheck = (req, res, next) => {
    if (req.isAuthenticated()) {
        // If the user is authenticated, redirect to the root route
        res.redirect('/');
    }
    // If the user is not authenticated, proceed to the login route
    next();
}

auth.get('/login', authCheck, authController.login);
auth.get('/google', authController.google);
auth.get('/logout', authController.logout);
// callback route for google to redirect ot
auth.get('/google/redirect',passport.authenticate('google') ,authController.google_redirect);
export default auth;