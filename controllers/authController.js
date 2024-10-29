import passport from "passport";
import { Router } from "express";
import db from "../models/model.js";

const router = Router();

const login = (req, res) => {
    res.render('authViews/login.ejs');
}

const google = passport.authenticate('google', {
    scope: ['profile']
});

const profile = async (req, res) => {
    try {
        var userPosts = await db.query("SELECT posts.title, posts.id FROM posts JOIN users ON posts.user_id = users.id WHERE users.id = $1",[req.user.id]);
        var users = await db.query("SELECT * FROM users");
        userPosts = userPosts.rows;
        users = users.rows;
        res.render('authViews/home.ejs', {user: req.user, posts: userPosts, users: users});
    } catch (err) {
        console.log(err);
        res.send("Error getting user info");
    }
}

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

const updateFlag = async (req, res) => {
    const userId = req.query.userId;
    const userFlag = req.query.userFlag;
    const flagValue = userFlag == 'true' ? false : true;
    try {
        await db.query("UPDATE users SET flag = $1 WHERE  users.id = $2", [flagValue, userId]);
        res.redirect('/auth');
    } catch (error) {
        console.error("Error updating flag:", error);
        res.status(500).send("Error updating flag");
    }
}

export default {
    login, google, logout, google_redirect, profile, updateFlag
}