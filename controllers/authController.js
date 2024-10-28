import passport from "passport";
import { Router } from "express";

const router = Router();

const login = (req, res) => {
    res.render('authViews/login.ejs');
}

const google = passport.authenticate('google', {
    scope: ['profile']
});

const google_redirect = (req, res) => {
    res.redirect("/")
}

const logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            res.send("Error logging out");
            console.log(err);
        }
        res.redirect('/');
    });
}

export default {
    login, google, logout, google_redirect
}