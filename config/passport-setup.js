import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import GoogleStrategy from "passport-google-oauth20";
import db from "../models/model.js";
import env from "dotenv";


env.config();

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        const user = result.rows[0];
        done(null, user);
    } catch (err) {
        console.log("Error getting user");
        console.log(err);
    }
});

// Local Strategy
passport.use(
    new Strategy(async function verify(username, password, cb) {
    try {
        const already_exists = await db.query('SELECT * FROM users WHERE username = $1', [username]);
        const user = already_exists.rows;
        if (user.length === 0) {
            // Create a new user based on username & password
            const hash = bcrypt.hashSync(password, 10); 
            const randomImage = 'https://randomuser.me/api/portraits/men/' + Math.floor(Math.random() * 100) +  '.jpg';
            try {
            const result = await db.query('INSERT INTO users (username, password, thumbnail) VALUES ($1, $2, $3) RETURNING *', [username, hash, randomImage]);
            const user = result.rows[0];
            // return the newly created user
            return cb(null, user);
            } catch (error) {
                return cb(error);
            }
        } else {
            // check password for existing user
            if (bcrypt.compareSync(password, user[0].password)) {
                // user is authenticated
                return cb(null, user[0]);
            } else {
                // wrong password, no user returned
                return cb('User already exists, try loggin in', false);
            }
        }
    } catch (error) {
        return cb(error);
    }
}));

// Google Strategy
passport.use(new GoogleStrategy({
    // options for google strategy
    callbackURL: '/auth/google/redirect',
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret
    }, async (accessToken, refreshToken, profile, done) => {
        // passport callback function
        // console.log("profile = ", profile)
        //check if user already exists
        try {
            const result = await db.query("SELECT * FROM users WHERE googleid = $1", [profile.id]);
            const user = result.rows;
            if (user.length === 0) {
                try {
                    const result_ = await db.query("INSERT INTO users (username, googleid, thumbnail) VALUES ($1, $2, $3) RETURNING *",[profile.displayName, profile.id, profile.photos[0].value]);
                    const newUser = result_.rows[0];
                    return done(null, newUser);
                } catch (err) {
                    return done(err);
                }
            } else {
                const currentUser = user[0];
                return done(null, currentUser);
            }
        } catch (err) {
            return done(err);
        }
    })
)

export default passport;