import passport from "passport";
import { Router } from "express";
import db from "../models/model.js";

const router = Router();

// Passport middleware
const login = (req, res) => {
    res.render('authViews/login.ejs');
}

const google = passport.authenticate('google', {
    scope: ['profile']
});

const profile = async (req, res) => {
    if (req.user) {
        try {
            var userPosts = await db.query("SELECT posts.title, posts.user_id, posts.id FROM posts JOIN users ON posts.user_id = users.id WHERE users.id = $1 ORDER BY posts.id ASC", [req.user.id]);
            var users = await db.query("SELECT * FROM users ORDER BY id ASC");
            userPosts = userPosts.rows;
            users = users.rows;
            res.render('authViews/home.ejs', { user: req.user, posts: userPosts, users: users });
        } catch (err) {
            console.log(err);
            res.send("Error getting user info");
        }
    } else {
        res.redirect('/');
    }
}

const google_redirect = (req, res) => {
    res.redirect("/");
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
    if (req.user.id == 1) {
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
    } else {
        res.status(500).send("Forbidden");
    }
}

const login_post = (req, res) => {
    res.redirect("/");
}

const delUser = async (req, res) => {
    const Id = req.params.user_id;
    if (req.user.id !== 1)
        res.status(501).send("No permission");
    else if (Id == 1)
        res.status(501).send("Can't delete admin");
    else {
        // Find the index of the post with the given ID
        try {
            const result = await db.query("SELECT * FROM users WHERE id = $1", [Id]);
            const found = result.rows;
            if (found.length === 0) {
                // No post found
                res.status(404).send("No user with this id found.");
            } else {
                // If a post with the given ID is found, remove it
                try {
                    db.query("DELETE FROM users WHERE id = $1", [Id]);
                    res.redirect("/auth");
                } catch (err) {
                    console.log(err);
                    res.status(501).send("Error deleting user");
                }
            }
        } catch (err) {
            console.log(err);
            res.status(501).send("Error finding the user.");
        }
    }
}

export default {
    login, google, logout, google_redirect, profile, updateFlag, login_post, delUser
}